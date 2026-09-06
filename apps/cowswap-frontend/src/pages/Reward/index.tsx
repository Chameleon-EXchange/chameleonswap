import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Copy,
  Check,
  RefreshCw,
  Twitter,
  HelpCircle,
  DollarSign,
  Users,
  TrendingUp,
  MessageSquare,
  Award,
  ExternalLink as LinkIcon,
  Shield,
  Zap,
} from 'react-feather'
import styled, { keyframes, css } from 'styled-components/macro'
import { useWalletInfo } from '@cowprotocol/wallet'
import { useToggleAccountModal } from 'modules/account'
import http from 'utils/http'

const SYSTEM_BEARER_TOKEN = import.meta.env.VITE_SYSTEM_BEARER_TOKEN

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

// Layout Styles
const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 24px 72px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 20px 14px 48px;
  }
`

const TopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 850;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 12px;

  span.badge {
    font-size: 12.5px;
    font-weight: 700;
    color: #00ff87;
    background: rgba(0, 255, 135, 0.12);
    border: 1px solid rgba(0, 255, 135, 0.32);
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
`

const FeedbackButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(193, 101, 255, 0.08);
  border: 1px solid rgba(193, 101, 255, 0.2);
  color: #d8b4fe;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(193, 101, 255, 0.16);
    color: #ffffff;
    border-color: rgba(193, 101, 255, 0.35);
  }
`

const ContentCardsDeck = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1.25fr 0.9fr;
  gap: 24px;
  margin-bottom: 28px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: rgba(28, 8, 36, 0.85);
  border: 1px solid rgba(193, 101, 255, 0.16);
  border-radius: 20px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 36px rgba(16, 2, 22, 0.45);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(193, 101, 255, 0.32);
    box-shadow: 0 14px 40px rgba(118, 0, 147, 0.18);
  }
`

const CardHeader = styled.div`
  margin-bottom: 20px;
`

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg.info-icon {
    width: 16px;
    height: 16px;
    color: #a855f7;
    cursor: help;
  }
`

const CardSubtitle = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: #c4b5fd;
  opacity: 0.85;
  margin: 0;
`

const InputLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #e9d5ff;
`

const SuggestButton = styled.button`
  background: none;
  border: none;
  color: #c165ff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #e879f9;
    text-decoration: underline;
  }

  svg {
    width: 13px;
    height: 13px;
  }
`

const CodeInputWrapper = styled.div<{ $status?: 'available' | 'taken' | 'checking' | 'default' }>`
  position: relative;
  display: flex;
  align-items: center;
  background: #14041b;
  border: 1.5px solid
    ${({ $status }) =>
      $status === 'available'
        ? '#00ff87'
        : $status === 'taken'
        ? '#ff4d6d'
        : 'rgba(193, 101, 255, 0.25)'};
  border-radius: 14px;
  padding: 2px 14px;
  margin-bottom: 14px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #c165ff;
  }
`

const CodeInputField = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.8px;
  padding: 10px 0;
  font-family: monospace, inherit;

  &::placeholder {
    color: #6b21a8;
  }
`

const StatusBadge = styled.div<{ $status?: 'available' | 'taken' | 'checking' }>`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;

  ${({ $status }) =>
    $status === 'available' &&
    css`
      color: #00ff87;
    `}
  ${({ $status }) =>
    $status === 'taken' &&
    css`
      color: #ff4d6d;
    `}
  ${({ $status }) =>
    $status === 'checking' &&
    css`
      color: #a855f7;
    `}

  svg {
    width: 14px;
    height: 14px;
  }
`

const ShareUrlBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(18, 3, 24, 0.65);
  border: 1px dashed rgba(193, 101, 255, 0.25);
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 18px;
  font-size: 13px;
  color: #d8b4fe;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(26, 4, 35, 0.8);
    border-color: rgba(193, 101, 255, 0.5);
    color: #ffffff;
  }

  span.url-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: monospace;
    font-size: 12.5px;
  }
`

const PrimaryButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #760093 0%, #c165ff 100%);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.3px;

  &:hover {
    background: linear-gradient(135deg, #8b00ad 0%, #d482ff 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(193, 101, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #3b114d;
    color: #8a6499;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg.spinner {
    animation: ${spin} 1s linear infinite;
  }
`

// Traffic Card Content
const TrafficBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 130px;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`

const TrafficMetricsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;

  span.label {
    color: #c4b5fd;
    font-weight: 500;
  }

  span.value {
    color: #ffffff;
    font-weight: 700;
    font-family: monospace, inherit;
  }
`

const RadialGaugeContainer = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  circle.bg {
    fill: none;
    stroke: rgba(193, 101, 255, 0.12);
    stroke-width: 10;
  }

  circle.progress {
    fill: none;
    stroke: url(#chameleonGradient);
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 283;
    transition: stroke-dashoffset 1s ease-out;
  }

  div.center-val {
    position: absolute;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
  }
`

const CardFooterText = styled.div`
  border-top: 1px solid rgba(193, 101, 255, 0.1);
  padding-top: 14px;
  font-size: 12.5px;
  color: #a855f7;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 14px;
    height: 14px;
  }
`

// Payout Card
const PayoutBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0 32px;
  text-align: center;
`

const UsdcBadge = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, #760093 0%, #c165ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 16px;
  box-shadow: 0 8px 26px rgba(193, 101, 255, 0.38);
`

const PayoutAmount = styled.div`
  font-size: 28px;
  font-weight: 850;
  color: #ffffff;
  letter-spacing: -0.5px;
  margin-bottom: 4px;

  span.currency {
    font-size: 18px;
    color: #c165ff;
    margin-left: 6px;
  }
`

// Secondary Actions / Explainer
const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const ExplainerCard = styled.div`
  background: rgba(28, 8, 36, 0.7);
  border: 1px solid rgba(193, 101, 255, 0.12);
  border-radius: 18px;
  padding: 24px;

  h3 {
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 14px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    color: #c4b5fd;
    font-size: 13.5px;
    line-height: 1.7;

    li {
      margin-bottom: 6px;
    }
  }
`

const SocialShareCard = styled.div`
  background: rgba(28, 8, 36, 0.7);
  border: 1px solid rgba(193, 101, 255, 0.12);
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 13.5px;
    color: #c4b5fd;
    margin: 0 0 16px 0;
  }

  div.button-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
`

const OutlineButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(193, 101, 255, 0.08);
  border: 1px solid rgba(193, 101, 255, 0.22);
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(193, 101, 255, 0.18);
    border-color: rgba(193, 101, 255, 0.4);
    transform: translateY(-1px);
  }

  svg {
    width: 15px;
    height: 15px;
  }
`

const NotificationToast = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #760093 0%, #c165ff 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(193, 101, 255, 0.45);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10000;
  animation: ${fadeIn} 0.2s ease-out;

  svg {
    width: 18px;
    height: 18px;
    color: #00ff87;
  }
`

export function RewardPage() {
  const { account } = useWalletInfo()
  const toggleAccountModal = useToggleAccountModal()

  // State
  const [savedCode, setSavedCode] = useState<string>('')
  const [inputCode, setInputCode] = useState<string>('')
  const [codeStatus, setCodeStatus] = useState<'available' | 'taken' | 'checking' | 'default'>('default')
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Metrics
  const [points, setPoints] = useState(0)
  const [referralsCount, setReferralsCount] = useState(0)
  const [referredVolume, setReferredVolume] = useState(0)
  const [loadingData, setLoadingData] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Fetch or create user profile on load
  const loadUserData = useCallback(async () => {
    if (!account) return
    setLoadingData(true)
    try {
      // 1. Get referral code for wallet (auto-generates if not found)
      const codeRes = await http.get(`/api/v1/trader/referral-code/${account}`, {
        headers: {
          Authorization: `Bearer ${SYSTEM_BEARER_TOKEN}`,
        },
      })
      if (codeRes.data?.referralCode) {
        setSavedCode(codeRes.data.referralCode)
        setInputCode(codeRes.data.referralCode)
        setCodeStatus('available')
      }

      // 2. Get profile stats across all chains
      const profileRes = await http.get(`/api/v1/trader/${account}/all`, {
        headers: {
          Authorization: `Bearer ${SYSTEM_BEARER_TOKEN}`,
        },
      })
      const trader = profileRes.data?.trader
      if (trader) {
        setPoints(trader.totalPoints || 0)
        setReferralsCount(trader.referrals?.length || 0)
        setReferredVolume(trader.referalTradingVolume || 0)
      }
    } catch (err: any) {
      console.error('[RewardPage] Error fetching user data:', err)
    } finally {
      setLoadingData(false)
    }
  }, [account])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  // Availability checking on code change
  useEffect(() => {
    const trimmed = inputCode.trim().toUpperCase()
    if (!trimmed || trimmed === savedCode) {
      setCodeStatus(trimmed === savedCode ? 'available' : 'default')
      return
    }

    if (trimmed.length < 3) {
      setCodeStatus('default')
      return
    }

    setCodeStatus('checking')
    const timer = setTimeout(async () => {
      try {
        const res = await http.get(`/api/v1/trader/referral-code/check/${trimmed}`, {
          headers: { Authorization: `Bearer ${SYSTEM_BEARER_TOKEN}` },
        })
        setCodeStatus(res.data?.available ? 'available' : 'taken')
      } catch (e) {
        setCodeStatus('available')
      }
    }, 350)

    return () => clearTimeout(timer)
  }, [inputCode, savedCode])

  // Actions
  const handleSuggest = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    const suggested = `CHAM-${randomNum}`
    setInputCode(suggested)
  }

  const handleSaveCode = async () => {
    if (!account) {
      toggleAccountModal()
      return
    }
    const trimmed = inputCode.trim().toUpperCase()
    if (!trimmed || trimmed.length < 3) return

    setIsSaving(true)
    try {
      const res = await http.post(
        '/api/v1/trader/referral-code',
        {
          walletAddress: account,
          referralCode: trimmed,
        },
        {
          headers: {
            Authorization: `Bearer ${SYSTEM_BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.data?.referralCode) {
        setSavedCode(res.data.referralCode)
        setInputCode(res.data.referralCode)
        setCodeStatus('available')
        showToast('Referral code saved & locked! ✔')
      }
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Failed to save referral code'
      showToast(`Error: ${errMsg}`)
    } finally {
      setIsSaving(false)
    }
  }

  const referralLink = useMemo(() => {
    const code = savedCode || inputCode || 'CHAM-981994'
    return `https://chameleon.exchange/#/referral?ref=${code}`
  }, [savedCode, inputCode])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    showToast('Referral link copied to clipboard! ✔')
  }

  const shareOnTwitter = () => {
    const code = savedCode || inputCode
    const text = `Trade on Chameleon Swap with gasless signature routing and complete MEV protection! Use my referral code: ${code}\n\n${referralLink}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <PageContainer>
      {/* Top Header */}
      <TopHeader>
        <PageTitle>
          Rewards hub - Affiliate <span className="badge">Active</span>
        </PageTitle>
        <FeedbackButton href="https://discord.gg/chameleon" target="_blank" rel="noopener noreferrer">
          <MessageSquare size={15} />
          Give feedback
        </FeedbackButton>
      </TopHeader>

      {/* 3 Bento Cards Showcase (Full width without sidebar) */}
      <ContentCardsDeck>
        {/* CARD 1: Your referral code */}
        <Card>
          <div>
            <CardHeader>
              <CardTitle>
                Your referral code
                <HelpCircle className="info-icon" />
              </CardTitle>
              <CardSubtitle>
                Pick your own code or generate one. Once saved, it becomes permanently linked to your wallet,
                without ever revealing your wallet address.
              </CardSubtitle>
            </CardHeader>

            <InputLabelRow>
              <span>Referral code</span>
              <SuggestButton type="button" onClick={handleSuggest}>
                suggest one <RefreshCw />
              </SuggestButton>
            </InputLabelRow>

            <CodeInputWrapper $status={codeStatus}>
              <CodeInputField
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="CHAM-981994"
                maxLength={20}
              />
              {codeStatus === 'available' && (
                <StatusBadge $status="available">
                  <Check /> Available
                </StatusBadge>
              )}
              {codeStatus === 'taken' && (
                <StatusBadge $status="taken">
                  ✕ Taken
                </StatusBadge>
              )}
              {codeStatus === 'checking' && (
                <StatusBadge $status="checking">
                  Checking...
                </StatusBadge>
              )}
            </CodeInputWrapper>

            <ShareUrlBox onClick={copyToClipboard} title="Click to copy link">
              <span className="url-text">{referralLink}</span>
              <Copy size={15} />
            </ShareUrlBox>
          </div>

          <div>
            {!account ? (
              <PrimaryButton type="button" onClick={toggleAccountModal}>
                Connect wallet to lock code
              </PrimaryButton>
            ) : (
              <PrimaryButton
                type="button"
                onClick={handleSaveCode}
                disabled={isSaving || codeStatus === 'taken' || !inputCode.trim()}
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="spinner" size={16} /> Saving code...
                  </>
                ) : (
                  'Save & lock code'
                )}
              </PrimaryButton>
            )}
          </div>
        </Card>

        {/* CARD 2: Your referral traffic */}
        <Card>
          <div>
            <CardHeader>
              <CardTitle>
                Your referral traffic
                <HelpCircle className="info-icon" />
              </CardTitle>
            </CardHeader>

            <TrafficBody>
              <TrafficMetricsList>
                <MetricRow>
                  <span className="label">Volume left to next $10</span>
                  <span className="value">-</span>
                </MetricRow>
                <MetricRow>
                  <span className="label">Total earned</span>
                  <span className="value">${(referredVolume * 0.0005).toFixed(2)}</span>
                </MetricRow>
                <MetricRow>
                  <span className="label">Received</span>
                  <span className="value">$0.00</span>
                </MetricRow>
                <MetricRow>
                  <span className="label">Volume referred</span>
                  <span className="value">
                    ${referredVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </MetricRow>
                <MetricRow>
                  <span className="label">Total referrals</span>
                  <span className="value">{referralsCount}</span>
                </MetricRow>
                <MetricRow>
                  <span className="label">Active referrals</span>
                  <span className="value">{referralsCount}</span>
                </MetricRow>
              </TrafficMetricsList>

              {/* Circular Radial Ring with Chameleon Gradients */}
              <RadialGaugeContainer>
                <svg viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="chameleonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#760093" />
                      <stop offset="60%" stopColor="#c165ff" />
                      <stop offset="100%" stopColor="#00ff87" />
                    </linearGradient>
                  </defs>
                  <circle className="bg" cx="50" cy="50" r="42" />
                  <circle
                    className="progress"
                    cx="50"
                    cy="50"
                    r="42"
                    style={{
                      strokeDashoffset: referredVolume > 0 ? 100 : 283,
                    }}
                  />
                </svg>
                <div className="center-val">
                  ${(referredVolume * 0.0005).toFixed(0)}
                </div>
              </RadialGaugeContainer>
            </TrafficBody>
          </div>

          <CardFooterText>
            <HelpCircle />
            Last updated just now
          </CardFooterText>
        </Card>

        {/* CARD 3: Next payout */}
        <Card>
          <div>
            <CardHeader>
              <CardTitle>
                Next payout
                <HelpCircle className="info-icon" />
              </CardTitle>
            </CardHeader>

            <PayoutBody>
              <UsdcBadge>
                <DollarSign size={36} />
              </UsdcBadge>
              <PayoutAmount>
                0<span className="currency">USDC</span>
              </PayoutAmount>
            </PayoutBody>
          </div>

          <CardFooterText>
            Paid weekly by Friday via airdrop
          </CardFooterText>
        </Card>
      </ContentCardsDeck>

      {/* Explainer & Share Rows */}
      <BottomSection>
        <ExplainerCard>
          <h3>
            <Award size={18} color="#c165ff" />
            Affiliate Program Rules
          </h3>
          <ul>
            <li>Share your custom referral code or one-click invite link with friends.</li>
            <li>Referees enjoy gasless order signing and complete MEV protection.</li>
            <li>You earn 50 rewards points and trading volume revenue on every completed swap.</li>
            <li>Payouts are audited and distributed weekly directly to your linked wallet.</li>
          </ul>
        </ExplainerCard>

        <SocialShareCard>
          <div>
            <h3>Share Your Referral Link</h3>
            <p>Amplify your network and grow passive revenue with one click across Web3 socials.</p>
          </div>
          <div className="button-row">
            <OutlineButton type="button" onClick={shareOnTwitter}>
              <Twitter size={16} color="#1DA1F2" />
              Share on X
            </OutlineButton>
            <OutlineButton type="button" onClick={copyToClipboard}>
              <Copy size={16} color="#00ff87" />
              Copy Invite Link
            </OutlineButton>
          </div>
        </SocialShareCard>
      </BottomSection>

      {/* Toast Notification */}
      {toastMessage && (
        <NotificationToast>
          <Check />
          {toastMessage}
        </NotificationToast>
      )}
    </PageContainer>
  )
}