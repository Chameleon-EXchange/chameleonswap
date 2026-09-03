import React from 'react'

import LOGO_ICON_CHAMELEON from '@cowprotocol/assets/images/logo_icon_chameleonswap.svg'
import { isInjectedWidget } from '@cowprotocol/common-utils'
import SVG from 'react-inlinesvg'

import * as styledEl from './styled'

export interface CurrencyArrowSeparatorProps {
  isLoading: boolean
  disabled?: boolean
  hasSeparatorLine?: boolean
  isCollapsed?: boolean
  onSwitchTokens(): void
}

export function CurrencyArrowSeparator(props: CurrencyArrowSeparatorProps) {
  const { isLoading, onSwitchTokens, isCollapsed = true, hasSeparatorLine, disabled = false } = props
  const isInjectedWidgetMode = isInjectedWidget()

  return (
    <styledEl.Box isCollapsed={isCollapsed} hasSeparatorLine={hasSeparatorLine} disabled={disabled}>
      <styledEl.LoadingWrapper isLoading={isLoading}>
        {!isInjectedWidgetMode && isLoading ? (
          <styledEl.ChameleonLoader>
            <SVG src={LOGO_ICON_CHAMELEON} title="Loading..." />
          </styledEl.ChameleonLoader>
        ) : (
          <styledEl.ArrowDownIcon onClick={disabled ? undefined : onSwitchTokens} disabled={disabled} />
        )}
      </styledEl.LoadingWrapper>
    </styledEl.Box>
  )
}

