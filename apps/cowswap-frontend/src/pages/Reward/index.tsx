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

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 135, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 255, 135, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 135, 0); }
`

// Layout Styles
const PageContainer = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 16px 12px 48px;
  }
`

const TopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 10px;

  span.badge {
    font-size: 13px;
    font-weight: 700;
    color: #00ff87;
    background: rgba(0, 255, 135, 0.12);
    border: 1px solid rgba(0, 255, 135, 0.3);
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`

const FeedbackButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #9da8b6;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const SidebarTabs = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 960px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
  }
`

const TabButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#8a94a6')};
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  border: none;
  text-align: left;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }
`

const ContentCardsDeck = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1.25fr 0.85fr;
  gap: 20px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: rgba(18, 14, 34, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.14);
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
    color: #6c788a;
    cursor: help;
  }
`

const CardSubtitle = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: #8a96a8;
  margin: 0;
`

const InputLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #a0aec0;
`

const SuggestButton = styled.button`
  background: none;
  border: none;
  color: #00D4FF;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #70e2ff;
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
  background: #0d0a1a;
  border: 1.5px solid
    ${({ $status }) =>
      $status === 'available'
        ? '#00ff87'
        : $status === 'taken'
        ? '#ff4d6d'
        : 'rgba(255, 255, 255, 0.12)'};
  border-radius: 14px;
  padding: 2px 14px;
  margin-bottom: 14px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #00D4FF;
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
    color: #4a5568;
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
      color: #718096;
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
  background: rgba(0, 0, 0, 0.35);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 18px;
  font-size: 13px;
  color: #a0aec0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(0, 212, 255, 0.4);
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
  background: linear-gradient(135deg, #00D4FF 0%, #0095FF 100%);
  color: #070913;
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
  letter-spacing: 0.2px;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 212, 255, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #2d3748;
    color: #718096;
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
    color: #8c9ba8;
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
    stroke: rgba(255, 255, 255, 0.08);
    stroke-width: 10;
  }

  circle.progress {
    fill: none;
    stroke: url(#cyanEmeraldGradient);
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
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 14px;
  font-size: 12.5px;
  color: #6c7a89;
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
  background: linear-gradient(135deg, #2775CA 0%, #175399 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(39, 117, 202, 0.35);
`

const PayoutAmount = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
  margin-bottom: 4px;

  span.currency {
    font-size: 18px;
    color: #00D4FF;
    margin-left: 6px;
  }
`

// Secondary Actions / Explainer
const BottomSection = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const ExplainerCard = styled.div`
  background: rgba(18, 14, 34, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 22px;

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
    color: #9aa8b8;
    font-size: 13.5px;
    line-height: 1.7;

    li {
      margin-bottom: 6px;
    }
  }
`

const SocialShareCard = styled.div`
  background: rgba(18, 14, 34, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 22px;
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
    color: #8c9ba8;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
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
  background: #00ff87;
  color: #061e12;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 255, 135, 0.35);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10000;
  animation: ${fadeIn} 0.2s ease-out;

  svg {
    width: 18px;
    height: 18px;
  }
`

export function RewardPage() {
  const { account } = useWalletInfo()
  const toggleAccountModal = useToggleAccountModal()

  // State
  const [activeTab, setActiveTab] = useState<'overview' | 'affiliate' | 'rewards' | 'tokens' | 'proxy'>('affiliate')
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

      <MainGrid>
        {/* Left Navigation Tabs */}
        <SidebarTabs>
          <TabButton $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Overview
          </TabButton>
          <TabButton $active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')}>
            Affiliate
          </TabButton>
          <TabButton $active={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')}>
            My Rewards
          </TabButton>
          <TabButton $active={activeTab === 'tokens'} onClick={() => setActiveTab('tokens')}>
            Tokens
          </TabButton>
          <TabButton $active={activeTab === 'proxy'} onClick={() => setActiveTab('proxy')}>
            Account Proxy
          </TabButton>
        </SidebarTabs>

        {/* 3 Bento Cards Showcase */}
        <div>
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

                  {/* Circular Radial Ring */}
                  <RadialGaugeContainer>
                    <svg viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="cyanEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00D4FF" />
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
                <Award size={18} color="#00ff87" />
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
        </div>
      </MainGrid>

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