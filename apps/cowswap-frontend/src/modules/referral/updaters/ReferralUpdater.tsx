import { useEffect, useRef } from 'react'
import { SupportedChainId } from '@cowprotocol/cow-sdk'
import { useWalletInfo } from '@cowprotocol/wallet'

import { ReferralService } from 'modules/referral/services/ReferralService'

export function ReferralUpdater() {
  const { account, chainId } = useWalletInfo()
  const lastRegisteredRef = useRef<string | null>(null)

  useEffect(() => {
    if (account && chainId && lastRegisteredRef.current !== `${account}-${chainId}`) {
      lastRegisteredRef.current = `${account}-${chainId}`
      const referralService = ReferralService.getInstance()
      const referralCode = localStorage.getItem('referralCode')

      referralService
        .registerTrader(account, chainId as SupportedChainId, referralCode || undefined)
        .then(() => {
          console.log('[ReferralUpdater] Trader registered successfully:', account)
        })
        .catch((error) => {
          console.error('[ReferralUpdater] Error registering trader:', error)
        })
    }
  }, [account, chainId])

  return null
}

