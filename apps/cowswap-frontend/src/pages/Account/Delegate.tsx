import { useCallback } from 'react'

import ChamImage from '@cowprotocol/assets/images/Chameleon-2.png'
import { ClosableBanner, ButtonPrimary } from '@cowprotocol/ui'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { BANNER_IDS } from 'common/constants/banners'

import { DELEGATE_URL } from './constants'
import { BannerCard, BannerCardContent, BannerCardTitle, CloseButton } from './styled'

interface DelegateProps {
  dismissable?: boolean
  rowOnMobile?: boolean
}

// TODO: Add proper return type annotation
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Delegate({ dismissable = false, rowOnMobile }: DelegateProps) {
  // TODO: Add proper return type annotation

  const callback = useCallback(
    (close?: () => void) => (
      <BannerCard rowOnMobile={rowOnMobile}>
        {dismissable && close && <CloseButton onClick={close} />}
        <BannerCardContent>
          <BannerCardTitle>
            <Trans>
              Too <i>busy</i> <br />
              to vote?
            </Trans>
          </BannerCardTitle>
          <small>
            <Trans>Delegate your</Trans> <img src={ChamImage} alt={t`CHM Balance`} height="24" width="24" /> (v)CHM
          </small>
          <ButtonPrimary as="a" href={DELEGATE_URL} target="_blank" rel="noopener nofollow">
            <Trans>Delegate Now</Trans> ↗
          </ButtonPrimary>
        </BannerCardContent>
      </BannerCard>
    ),
    [rowOnMobile, dismissable],
  )

  return dismissable ? <ClosableBanner storageKey={BANNER_IDS.DELEGATE} callback={callback} /> : callback()
}
