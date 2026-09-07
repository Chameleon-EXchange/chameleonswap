import { ReactNode, useEffect, useState } from 'react'

import { PAGE_TITLES, WRAPPED_NATIVE_CURRENCIES as WETH } from '@cowprotocol/common-const'
import { useWalletInfo } from '@cowprotocol/wallet'

import { useLingui } from '@lingui/react/macro'
import { useLocation, useParams } from 'react-router'

import { PageTitle } from 'modules/application'
import { ReferralPopup } from 'modules/referral/components/ReferralPopup'
import { swapDerivedStateAtom, SwapUpdaters, SwapWidget, useSwapDerivedStateToFill } from 'modules/swap'
import { PageWrapper, PrimaryWrapper, TradeRouteRedirect } from 'modules/trade'

import { Routes } from 'common/constants/routes'
import { HydrateAtom } from 'common/state/HydrateAtom'

const TRADE_PAGE_MAX_WIDTH = '1800px'

export function SwapPage(): ReactNode {
  const params = useParams()
  const location = useLocation()
  const { i18n } = useLingui()
  const { chainId } = useWalletInfo()
  const swapDerivedStateToFill = useSwapDerivedStateToFill()

  const [showReferralPopup, setShowReferralPopup] = useState(false)
  const [referralCode, setReferralCode] = useState<string | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const refCode = searchParams.get('ref')
    if (refCode) {
      setReferralCode(refCode)
      setShowReferralPopup(true)
    }
  }, [location.search])

  if (!params.chainId) {
    return (
      <TradeRouteRedirect route={Routes.SWAP} inputCurrencyFallback={chainId ? WETH[chainId]?.symbol : undefined} />
    )
  }

  return (
    <HydrateAtom atom={swapDerivedStateAtom} state={swapDerivedStateToFill}>
      <PageTitle title={i18n._(PAGE_TITLES.SWAP)} />

      <SwapUpdaters />
      <PageWrapper isUnlocked maxWidth={TRADE_PAGE_MAX_WIDTH} hideOrdersTable>
        <PrimaryWrapper>
          <SwapWidget />
        </PrimaryWrapper>
      </PageWrapper>
      {showReferralPopup && referralCode && (
        <ReferralPopup referralCode={referralCode} onClose={() => setShowReferralPopup(false)} />
      )}
    </HydrateAtom>
  )
}

