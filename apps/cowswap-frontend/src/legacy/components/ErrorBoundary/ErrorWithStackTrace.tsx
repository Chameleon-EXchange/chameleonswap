import React from 'react'

import ChameleonErrorImg from '@cowprotocol/assets/images/Chameleon-1.png'
import { CODE_LINK, DISCORD_LINK } from '@cowprotocol/common-const'
import { userAgent } from '@cowprotocol/common-utils'
import { AutoRow, ButtonPrimary, ExternalLink, Media, MEDIA_WIDTHS, UI } from '@cowprotocol/ui'

import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

import { AutoColumn } from 'legacy/components/Column'
import { cowSwapStore, AppState } from 'legacy/state'

import { Title } from 'modules/application/pure/Page'

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 0.5rem 0;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledTitle = styled(Title)`
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    text-align: center;
  }
`

const StyledParagraph = styled.p`
  overflow-x: auto;
`

const CodeBlockWrapper = styled.div`
  background: var(${UI.COLOR_PAPER});
  overflow: auto;
  white-space: pre;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 24px rgba(0, 0, 0, 0.04),
    0 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 16px;
  padding: 16px;
  color: inherit;

  ${Media.upToSmall()} {
    padding: 12px;
    width: auto;
  }
`

const ActionButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
  align-items: center;
`

const RecoveryButton = styled.button`
  background: linear-gradient(135deg, #760093 0%, #c165ff 100%);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const SecondaryRecoveryButton = styled.button`
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
  }
`

const LinkWrapper = styled.div`
  color: ${({ theme }) => theme.blue1};
  padding: 6px 12px;
`

function truncate(value?: string): string | undefined {
  return value ? value.slice(0, 1000) : undefined
}

export const ErrorWithStackTrace = ({ error }: { error: Error }) => {
  const encodedBody = encodeURIComponent(issueBody(error))

  return (
    <>
      <FlexContainer>
        <StyledTitle>
          <Trans>Something went wrong</Trans>
        </StyledTitle>
        <img
          src={ChameleonErrorImg}
          alt="Chameleon Swap Error"
          height="120"
          style={{ objectFit: 'contain', borderRadius: '12px' }}
        />
      </FlexContainer>
      <AutoColumn gap={'md'}>
        <ActionButtonsRow>
          <RecoveryButton onClick={() => window.location.reload()}>
            <Trans>Reload Application</Trans>
          </RecoveryButton>
          <SecondaryRecoveryButton onClick={() => (window.location.href = '/')}>
            <Trans>Back to Home</Trans>
          </SecondaryRecoveryButton>
        </ActionButtonsRow>
        <CodeBlockWrapper>
          <code>
            <ThemedText.Main fontSize={10}>
              <StyledParagraph>{error.stack}</StyledParagraph>
            </ThemedText.Main>
          </code>
        </CodeBlockWrapper>
        <AutoRow>
          <LinkWrapper>
            <ExternalLink
              id="create-github-issue-link"
              href={
                CODE_LINK +
                `/issues/new?assignees=&labels=🐞 Bug,🔥 Critical&body=${encodedBody}&title=${encodeURIComponent(
                  `Crash report: \`${error.name}${error.message && `: ${truncate(error.message)}`}\``
                )}`
              }
            >
              <ThemedText.Link fontSize={14}>
                <Trans>Create an issue on GitHub</Trans>
                <span>↗</span>
              </ThemedText.Link>
            </ExternalLink>
          </LinkWrapper>
          <LinkWrapper>
            <ExternalLink id="get-support-on-discord" href={DISCORD_LINK}>
              <ThemedText.Link fontSize={14}>
                <Trans>Get support on Discord</Trans>
                <span>↗</span>
              </ThemedText.Link>
            </ExternalLink>
          </LinkWrapper>
        </AutoRow>
      </AutoColumn>
    </>
  )
}

function getRelevantState(): null | keyof AppState {
  const path = window.location.hash
  if (!path.startsWith('#/')) {
    return null
  }
  const pieces = path.substring(2).split(/[/\\?]/)
  switch (pieces[0]) {
    case 'swap':
      return 'swap'
    /* case 'add':
        if (pieces[1] === 'v2') return 'mint'
        else return 'mintV3'
      case 'remove':
        if (pieces[1] === 'v2') return 'burn'
        else return 'burnV3' */
  }
  return null
}

function issueBody(error: Error): string {
  const relevantState = getRelevantState()
  const deviceData = userAgent
  return `## URL

${window.location.href}

${
  relevantState
    ? `## \`${relevantState}\` state

\`\`\`json
${JSON.stringify(cowSwapStore.getState()[relevantState], null, 2)}
\`\`\`
`
    : ''
}
${
  error.name &&
  `## Error

\`\`\`
${error.name}${error.message && `: ${truncate(error.message)}`}
\`\`\`
`
}
${
  error.stack &&
  `## Stacktrace

\`\`\`
${truncate(error.stack)}
\`\`\`
`
}
${
  deviceData &&
  `## Device data

\`\`\`json
${JSON.stringify(deviceData, null, 2)}
\`\`\`
`
}
`
}
