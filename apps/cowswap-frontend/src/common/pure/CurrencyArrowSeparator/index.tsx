import { ReactNode } from 'react'

import LOGO_ICON_CHAMELEON from '@cowprotocol/assets/images/logo_icon_chameleonswap.svg'
import { isInjectedWidget } from '@cowprotocol/common-utils'
import SVG from 'react-inlinesvg'

import * as styledEl from './styled'

export interface CurrencyArrowSeparatorProps {
  isLoading: boolean
  disabled?: boolean
  hasSeparatorLine?: boolean
  isCollapsed?: boolean
  isDarkMode?: boolean
  onSwitchTokens(): void
}

export function CurrencyArrowSeparator({
  isLoading,
  onSwitchTokens,
  isCollapsed = true,
  hasSeparatorLine,
  disabled = false,
}: CurrencyArrowSeparatorProps): ReactNode {
  const isInjectedWidgetMode = isInjectedWidget()

  return (
    <styledEl.Box
      id="currency-arrow-separator"
      data-isLoading={isLoading ? true : undefined}
      isCollapsed={isCollapsed}
      hasSeparatorLine={hasSeparatorLine}
    >
      <styledEl.LoadingWrapper type="button" $isLoading={isLoading} disabled={disabled} onClick={onSwitchTokens}>
        {!isInjectedWidgetMode && isLoading ? (
          <styledEl.ChameleonLoader>
            <SVG src={LOGO_ICON_CHAMELEON} title="Loading..." />
          </styledEl.ChameleonLoader>
        ) : (
          <styledEl.ArrowDownIcon disabled={disabled} />
        )}
      </styledEl.LoadingWrapper>
    </styledEl.Box>
  )
}
