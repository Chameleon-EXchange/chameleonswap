import { type CSSProperties, type ReactNode, useMemo, useState } from 'react'

import { useAnalyticsReporter } from '@cowprotocol/analytics'
import { useFeatureFlags, useMediaQuery } from '@cowprotocol/common-hooks'
import { isInjectedWidget } from '@cowprotocol/common-utils'
import { Footer, Media } from '@cowprotocol/ui'
import { useWalletDetails, useWalletInfo } from '@cowprotocol/wallet'

import { useInjectedWidgetParams } from 'entities/injectedWidget'

import { URLWarning } from 'legacy/components/Header/URLWarning'
import { useDarkModeManager } from 'legacy/state/user/hooks'

import { AccountModal } from 'modules/account'
import { useInjectedWidgetMetaData } from 'modules/injectedWidget'
import { useInitializeUtm } from 'modules/utm'

import { CoWAmmBanner } from 'common/containers/CoWAmmBanner'
import { InvalidLocalTimeWarning } from 'common/containers/InvalidLocalTimeWarning'
import { useCustomTheme } from 'common/hooks/useCustomTheme'
import { useGetMarketDimension } from 'common/hooks/useGetMarketDimension'

import { RecoveryBanner } from './RecoveryBanner'
import { SnowfallOverlay } from './SnowfallOverlay.pure'

import { PageBackgroundContext, PageBackgroundVariant } from '../../contexts/PageBackgroundContext'
import { ADDITIONAL_FOOTER_CONTENT, PRODUCT_VARIANT } from '../App/menuConsts'
import * as styledEl from '../App/styled'
import { isChristmasTheme as isChristmasThemeHelper } from '../App/styled'
import { AppMenu } from '../AppMenu'
import { NetworkAndAccountControls } from '../NetworkAndAccountControls/NetworkAndAccountControls.container'

interface AppContainerProps {
  children: ReactNode | ReactNode[]
}

interface FooterSectionProps {
  show: boolean
}

export function AppContainer({ children }: AppContainerProps): ReactNode {
  const { chainId, account } = useWalletInfo()
  const { walletName } = useWalletDetails()
  const { isYieldEnabled } = useFeatureFlags()

  useAnalyticsReporter({
    account,
    chainId,
    walletName,
    marketDimension: useGetMarketDimension() || undefined,
    injectedWidgetAppId: useInjectedWidgetMetaData()?.appCode,
  })

  useInitializeUtm()
  const isInjectedWidgetMode = isInjectedWidget()
  const { bodyWrapperStyle } = useInjectedWidgetParams()
  const [darkMode] = useDarkModeManager()
  const [pageBackgroundVariant, setPageBackgroundVariant] = useState<PageBackgroundVariant>('default')
  const [pageScene, setPageScene] = useState<ReactNode | null>(null)

  const isMobile = useMediaQuery(Media.upToMedium(false))

  const customTheme = useCustomTheme()
  const pageBackgroundValue = useMemo(
    () => ({
      variant: pageBackgroundVariant,
      setVariant: setPageBackgroundVariant,
      scene: pageScene,
      setScene: setPageScene,
    }),
    [pageBackgroundVariant, pageScene],
  )

  const networkAndAccountControls = <NetworkAndAccountControls />
  const isChristmasTheme = isChristmasThemeHelper(customTheme)
  const showSnowfall = !isInjectedWidgetMode && isChristmasTheme

  return (
    <PageBackgroundContext.Provider value={pageBackgroundValue}>
      <styledEl.AppWrapper>
        <URLWarning />
        <RecoveryBanner />
        <InvalidLocalTimeWarning />

        <AccountModal />

        <AppMenu customTheme={customTheme}>{networkAndAccountControls}</AppMenu>

        {isYieldEnabled && <CoWAmmBanner />}

        <styledEl.BodyWrapper
          id="bodyWrapper"
          style={isInjectedWidgetMode ? (bodyWrapperStyle as CSSProperties) : undefined}
          customTheme={customTheme}
          backgroundVariant={pageBackgroundVariant}
          $hasActiveSpeechBubbleNotification={false}
        >
          {children}
          <styledEl.Marginer />
        </styledEl.BodyWrapper>

        <SnowfallOverlay show={showSnowfall} isMobile={isMobile} darkMode={darkMode} />
        <FooterSection show={!isInjectedWidgetMode} />

        {/* Render MobileHeaderControls outside of MenuBar on mobile */}
        {isMobile && !isInjectedWidgetMode && networkAndAccountControls}
      </styledEl.AppWrapper>
    </PageBackgroundContext.Provider>
  )
}

function FooterSection({ show }: FooterSectionProps): ReactNode {
  if (!show) {
    return null
  }

  return (
    <styledEl.FooterSlot>
      <Footer productVariant={PRODUCT_VARIANT} additionalFooterContent={ADDITIONAL_FOOTER_CONTENT} hasTouchFooter />
    </styledEl.FooterSlot>
  )
}
