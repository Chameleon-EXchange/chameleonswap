import { type ReactNode } from 'react'

import { PAGE_TITLES } from '@cowprotocol/common-const'

import { useLingui } from '@lingui/react/macro'

import { PageTitle } from 'modules/application'

import { RewardPage } from 'pages/Reward'

export default function AccountReferral(): ReactNode {
  const { i18n } = useLingui()

  return (
    <>
      <PageTitle title={i18n._(PAGE_TITLES.AFFILIATE)} />
      <RewardPage embedded />
    </>
  )
}
