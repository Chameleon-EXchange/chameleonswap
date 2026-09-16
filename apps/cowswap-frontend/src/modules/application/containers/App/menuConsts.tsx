import { i18n, MessageDescriptor } from '@lingui/core'

import { ACCOUNT_PROXY_LABEL } from '@cowprotocol/common-const'
import { isEvmChain, SupportedChainId } from '@cowprotocol/cow-sdk'
import { MenuItem, ProductVariant } from '@cowprotocol/ui'

import { msg } from '@lingui/core/macro'

// import AppziButton from 'legacy/components/AppziButton'
import { Version } from 'legacy/components/Version'

import { getProxyAccountUrl } from 'modules/accountProxy'
import { FortuneWidget } from 'modules/fortune'

export const PRODUCT_VARIANT = ProductVariant.ChameleonSwap

type UntranslatedMenuItem = {
  label: MessageDescriptor
  children: Array<{
    href: string
    label: MessageDescriptor
    external?: boolean
  }>
}

const ACCOUNT_ITEM = (chainId: SupportedChainId): UntranslatedMenuItem => ({
  label: msg`Account`,
  children: [
    {
      href: '/account',
      label: msg`Overview`,
    },
    {
      href: '/account/affiliate',
      label: msg`Affiliate`,
    },
    {
      href: '/account/my-rewards',
      label: msg`My Rewards`,
    },
    {
      href: '/account/tokens',
      label: msg`Tokens`,
    },
    ...(isEvmChain(chainId)
      ? [
          {
            href: getProxyAccountUrl(chainId),
            label: ACCOUNT_PROXY_LABEL,
          },
        ]
      : []),
  ],
})

const MORE_ITEM: UntranslatedMenuItem = {
  label: msg`More`,
  children: [
    {
      href: 'https://mevblocker.io/',
      label: msg`MEV Blocker`,
      external: true,
    },
  ],
}

export const NAV_ITEMS = (chainId: SupportedChainId, _isSolversEnabled?: boolean): MenuItem[] => {
  const _ACCOUNT_ITEM = ACCOUNT_ITEM(chainId)
  const accountItem: MenuItem = {
    label: i18n._(_ACCOUNT_ITEM.label),
    children: _ACCOUNT_ITEM.children.map(({ href, label }) => ({
      href,
      label: i18n._(label),
    })),
  }

  const moreItem: MenuItem = {
    label: i18n._(MORE_ITEM.label),
    children: MORE_ITEM.children.map(({ href, label, external }) => ({
      href,
      label: i18n._(label),
      external,
    })),
  }

  return [accountItem, moreItem]
}

export const ADDITIONAL_FOOTER_CONTENT = (
  <>
    <Version />
    <FortuneWidget />
    {/* <AppziButton /> */}
  </>
)
