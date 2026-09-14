import { SupportedChainId } from '@cowprotocol/cow-sdk'

import { NAV_ITEMS } from './menuConsts'

jest.mock('@lingui/core', () => ({
  i18n: {
    _: (message: { id?: string; message?: string }) => message.id || message.message || '',
  },
}))

jest.mock('@cowprotocol/common-const', () => ({
  ACCOUNT_PROXY_LABEL: 'Account Proxy',
}))

jest.mock('@cowprotocol/ui', () => ({
  BadgeTypes: {
    ALERT: 'ALERT',
  },
  ProductVariant: {
    CowSwap: 'CowSwap',
  },
}))

jest.mock('legacy/components/AppziButton', () => ({
  __esModule: true,
  default: () => null,
}))

jest.mock('legacy/components/Version', () => ({
  Version: () => null,
}))

jest.mock('modules/fortune', () => ({
  FortuneWidget: () => null,
}))

jest.mock('modules/accountProxy', () => ({
  getProxyAccountUrl: (chainId: number) => `/${chainId}/account/account-proxy`,
}))

jest.mock('./menuConsts.utils', () => ({
  getSolversExplorerUrl: () => 'https://explorer.cow.fi/solvers',
}))

jest.mock('common/constants/routes', () => ({
  Routes: {
    ACCOUNT_AFFILIATE_PARTNER: '/account/affiliate/partner',
    ACCOUNT_AFFILIATE_TRADER: '/account/affiliate/trader',
    PLAY_COWRUNNER: '/play/cowrunner',
    PLAY_MEVSLICER: '/play/mevslicer',
  },
}))

describe('NAV_ITEMS', () => {
  it('returns Chameleon Swap navigation items', () => {
    const navItems = NAV_ITEMS(SupportedChainId.MAINNET)
    expect(navItems).toHaveLength(2)

    const accountItem = navItems[0]
    expect(accountItem.children?.map((c) => c.href)).toEqual([
      '/account',
      '/account/tokens',
      '/1/account/account-proxy',
    ])

    const moreItem = navItems[1]
    expect(moreItem.children?.map((c) => c.href)).toEqual(['https://mevblocker.io/'])
  })
})
