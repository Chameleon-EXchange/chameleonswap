import iconSocialDiscordSrc from '@cowprotocol/assets/images/icon-social-discord.svg'
import iconSocialForumSrc from '@cowprotocol/assets/images/icon-social-forum.svg'
import iconSocialGithubSrc from '@cowprotocol/assets/images/icon-social-github.svg'
import iconSocialSnapshotSrc from '@cowprotocol/assets/images/icon-social-snapshot.svg'
import iconSocialXSrc from '@cowprotocol/assets/images/icon-social-x.svg'

import { ProductVariant } from '../../pure/ProductLogo'

import { NavItemProps } from './index'

type NavItemChildrenProps = NonNullable<NavItemProps['children']>[number]

export const SOCIAL_LINKS = [
  {
    href: 'https://x.com/ChameleonSwap',
    label: 'Twitter/X',
    icon: iconSocialXSrc,
    external: true,
    utmContent: 'social-twitter',
  },
  {
    href: 'https://discord.com/invite/#',
    label: 'Discord',
    icon: iconSocialDiscordSrc,
    external: true,
    utmContent: 'social-discord',
  },
  {
    href: 'https://github.com/#',
    label: 'GitHub',
    icon: iconSocialGithubSrc,
    external: true,
    utmContent: 'social-github',
  },
  {
    href: '#',
    label: 'Forum',
    icon: iconSocialForumSrc,
    external: true,
    utmContent: 'social-forum',
  },
  {
    href: '#',
    label: 'Snapshot',
    icon: iconSocialSnapshotSrc,
    external: true,
    utmContent: 'social-snapshot',
  },
] as const satisfies NavItemChildrenProps[]

export const PRODUCT_LOGO_LINKS = [
  {
    href: 'https://chameleon.exchange/',
    label: 'Chameleon Swap',
    productVariant: ProductVariant.ChameleonSwap,
    external: true,
    utmContent: 'product-chameleon-swap',
  },
] as const satisfies NavItemChildrenProps[]

export const GLOBAL_FOOTER_DESCRIPTION =
  'Chameleon Swap is an open collective of developers, market makers, and community contributors on a mission to protect users from the dangers of DeFi.'

const FOOTER_NAV_GROUP_PRODUCTS = {
  label: 'Products',
  children: [
    {
      label: 'Chameleon swap',
      href: 'https://chameleon.exchange/',
      external: true,
      utmContent: 'footer-products-cow-swap',
    },
    { label: 'Chameleon Protocol', href: '#', external: true, utmContent: 'footer-products-chameleon-protocol' },
    { label: 'Chameleon AMM', href: '#', external: true, utmContent: 'footer-products-cow-amm' },
    { label: 'MEV Blocker', href: '#', external: true, utmContent: 'footer-products-mev-blocker' },
    { label: 'Chameleon Explorer', href: '#', external: true, utmContent: 'footer-products-cow-explorer' },
    { label: 'Chameleon Widget', href: '#', external: true, utmContent: 'footer-products-cow-widget' },
  ],
} as const satisfies NavItemProps

const FOOTER_NAV_GROUP_HELP = {
  label: 'Help',
  children: [
    { label: 'Docs', href: 'https://docs.chameleon.exchange', external: true, utmContent: 'footer-help-docs' },
    {
      label: 'Knowledge Base',
      href: '#',
      external: true,
      utmContent: 'footer-help-knowledge-base',
    },
    {
      label: 'Report Scams',
      href: '#',
      external: true,
      utmContent: 'footer-help-report-scams',
    },
  ],
} as const satisfies NavItemProps

const FOOTER_NAV_GROUP_MISC = {
  label: 'Misc.',
  children: [
    { label: 'For DAOs', href: '#', external: true, utmContent: 'footer-misc-for-daos' },
    {
      label: 'Token Charts',
      href: '#',
      external: true,
      utmContent: 'footer-misc-token-charts',
    },
  ],
} as const satisfies NavItemProps

export function getAboutFooterNavChildren(): NavItemChildrenProps[] {
  return [
    { href: '#', label: 'Governance', external: true, utmContent: 'footer-about-governance' },
    { href: '#', label: 'Revenue', external: true, utmContent: 'footer-about-revenue' },
    { href: '#', label: 'Grants', external: true, utmContent: 'footer-about-grants' },
    { href: '#', label: 'Careers', external: true, utmContent: 'footer-about-careers' },
    { href: '#', label: 'Brand Kit', external: true, utmContent: 'footer-about-brand-kit' },
    { href: '#', label: 'Legal', external: true, utmContent: 'footer-about-legal' },
  ]
}

export function getGlobalFooterNavItems(): NavItemProps[] {
  return [
    { label: 'About', children: getAboutFooterNavChildren() },
    FOOTER_NAV_GROUP_PRODUCTS,
    FOOTER_NAV_GROUP_HELP,
    FOOTER_NAV_GROUP_MISC,
  ]
}
