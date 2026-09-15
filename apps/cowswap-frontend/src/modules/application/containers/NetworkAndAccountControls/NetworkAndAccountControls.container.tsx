import { ReactNode } from 'react'

import { useInjectedWidgetParams } from 'entities/injectedWidget'

import { AccountElement } from 'legacy/components/Header/AccountElement/AccountElement.pure'
import { ReferButton } from 'legacy/components/Header/ReferButton'
import { HeaderControls, HeaderElement } from 'legacy/components/Header/styled'

import { NetworkSelector } from '../NetworkSelector/NetworkSelector.container'

export function NetworkAndAccountControls(): ReactNode {
  const { hideNetworkSelector } = useInjectedWidgetParams()

  return (
    <HeaderControls>
      {!hideNetworkSelector && <NetworkSelector />}
      <ReferButton />
      <HeaderElement>
        <AccountElement />
      </HeaderElement>
    </HeaderControls>
  )
}
