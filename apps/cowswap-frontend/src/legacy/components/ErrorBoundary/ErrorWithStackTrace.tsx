import { ReactNode } from 'react'

import ChameleonErrorImg from '@cowprotocol/assets/images/Chameleon-1.png'
import { CODE_LINK, DISCORD_LINK } from '@cowprotocol/common-const'
import { userAgent } from '@cowprotocol/common-utils'
import { AutoRow, MEDIA_WIDTHS, ExternalLink, UI, Media } from '@cowprotocol/ui'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

import { AutoColumn } from 'legacy/components/Column'
import CopyHelper from 'legacy/components/Copy'

// eslint-disable-next-line import/no-internal-modules -- Direct import to avoid circular dependency (barrel re-exports App which imports ErrorBoundary)
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
    background: rgba(255, 255, 255, 0.16);
  }
`

const StyledParagraph = styled.p`
  overflow-x: auto;
`

const CodeBlockWrapper = styled.div`
  background: var(${UI.COLOR_PAPER});
  overflow: auto;
  white-space: pre;
  box-shadow:
    0 0 1px rgba(0, 0, 0, 0.01),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 16px 24px rgba(0, 0, 0, 0.04),
    0 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 16px;
  padding: 16px;
  color: inherit;

  ${Media.upToSmall()} {
    padding: 12px;
    width: auto;
  }
`

const LinkWrapper = styled.div`
  color: ${({ theme }) => theme.blue1};
  padding: 6px 24px;
`

const IdText = styled(ThemedText.Main)`
  opacity: 0.7;
`

const IdRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

interface ErrorWithStackTraceProps {
  error: Error
  eventId: string
}

function truncate(value?: string): string | undefined {
  return value ? value.slice(0, 1000) : undefined
}

export const ErrorWithStackTrace = ({ error, eventId }: ErrorWithStackTraceProps): ReactNode => {
  const encodedBody = encodeURIComponent(issueBody(error, eventId))

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
        {eventId && (
          <IdRow>
            <IdText fontSize={14}>Event ID:</IdText>
            <CopyHelper toCopy={eventId}>{eventId}</CopyHelper>
          </IdRow>
        )}
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
                  `Crash report${eventId ? ` [${eventId}]` : ''}: \`${error.name}${error.message && `: ${truncate(error.message)}`}\``,
                )}`
              }
            >
              <ThemedText.Link fontSize={16}>
                <Trans>Create an issue on GitHub</Trans>
                <span>↗</span>
              </ThemedText.Link>
            </ExternalLink>
          </LinkWrapper>
          <LinkWrapper>
            <ExternalLink id="get-support-on-discord" href={DISCORD_LINK}>
              <ThemedText.Link fontSize={16}>
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

function issueBody(error: Error, eventId: string): string {
  const deviceData = userAgent
  const sentryEventUrl = `https://cowprotocol.sentry.io/issues/?query=${encodeURIComponent(`id:${eventId}`)}`
  return `## URL

${window.location.href}

## Sentry Event ID

\`\`\`
${eventId}
\`\`\`

${sentryEventUrl}

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
