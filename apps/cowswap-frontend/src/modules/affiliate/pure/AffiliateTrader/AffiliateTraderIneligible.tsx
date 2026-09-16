import { ReactNode } from 'react'

import svgChameleonLogoSrc from '@cowprotocol/assets/images/logo_icon_chameleonswap.svg'

import { Trans } from '@lingui/react/macro'

import { IneligibleCard, IneligibleImage, IneligibleSubtitle, IneligibleTitle } from '../shared'
import { TraderIneligible } from '../TraderIneligible'

export function AffiliateTraderIneligible(): ReactNode {
  return (
    <IneligibleCard>
      <IneligibleImage src={svgChameleonLogoSrc} ariaHidden />

      <IneligibleTitle>
        <Trans>Your wallet is ineligible</Trans>
      </IneligibleTitle>
      <IneligibleSubtitle>
        <TraderIneligible />
      </IneligibleSubtitle>
    </IneligibleCard>
  )
}
