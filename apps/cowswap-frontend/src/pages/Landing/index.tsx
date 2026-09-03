import React from 'react'
import { UI, ButtonPrimary } from '@cowprotocol/ui'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { 
  FiTrendingUp, 
  FiTarget, 
  FiShield, 
  FiZap, 
  FiClock, 
  FiCreditCard, 
  FiActivity, 
  FiAward, 
  FiArrowUpRight, 
  FiArrowRight,
  FiCheckCircle,
  FiBookOpen
} from 'react-icons/fi'
import { Routes } from 'common/constants/routes'

const FullScreenWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px 100px;
  overflow-x: hidden;
`

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// Hero Badge
const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(193, 101, 255, 0.1);
  border: 1px solid rgba(193, 101, 255, 0.25);
  color: #c165ff;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin-bottom: 24px;
  animation: fadeInDown 0.6s ease-out;

  span {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #00ff87;
    box-shadow: 0 0 8px #00ff87;
  }
`

// Hero Section
const HeroSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  max-width: 860px;
  margin-bottom: 48px;
  
  h1 {
    font-size: 3.8rem;
    font-weight: 850;
    line-height: 1.12;
    margin-bottom: 24px;
    letter-spacing: -1.5px;
    background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.75) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeInDown 0.8s ease-out;
    
    @media (max-width: 768px) {
      font-size: 2.6rem;
      letter-spacing: -1px;
    }
  }
  
  p {
    font-size: 1.25rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.72);
    margin-bottom: 36px;
    max-width: 720px;
    animation: fadeIn 1s ease-out;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 28px;
    }
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  animation: fadeInUp 1s ease-out;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`

const AnimatedPrimaryButton = styled(ButtonPrimary)`
  padding: 16px 36px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #760093 0%, #c165ff 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 20px rgba(118, 0, 147, 0.4);
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  min-height: 52px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(193, 101, 255, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 32px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

// Live Stats Strip (Miller's Law / Hick's Law)
const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px 32px;
  margin-bottom: 60px;
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.9s ease-out;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .stat-value {
    font-size: 1.9rem;
    font-weight: 850;
    color: #ffffff;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
    background: linear-gradient(135deg, #ffffff 0%, #c165ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stat-label {
    font-size: 0.88rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

// Core Pillars (Solver Competition & MEV Shield)
const TopicList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  width: 100%;
  margin-bottom: 70px;
  animation: fadeInUp 1s ease-out;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const TopicCard = styled.div`
  background: linear-gradient(145deg, rgba(20, 10, 30, 0.6) 0%, rgba(10, 5, 18, 0.8) 100%);
  border: 1px solid rgba(193, 101, 255, 0.15);
  padding: 36px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(14px);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-height: 240px;
  
  h4 {
    font-size: 1.55rem;
    font-weight: 800;
    margin: 0 0 14px 0;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  p {
    font-size: 1.05rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 24px 0;
  }
  
  a {
    align-self: flex-start;
    color: #c165ff;
    font-size: 0.98rem;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    min-height: 40px;
    
    svg {
      transition: transform 0.2s;
    }
    
    &:hover {
      color: #ffffff;
      svg {
        transform: translateX(4px);
      }
    }
  }
  
  &:hover {
    transform: translateY(-6px);
    border-color: rgba(193, 101, 255, 0.35);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 24px rgba(118, 0, 147, 0.2);
  }
`

// Section Header
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  max-width: 680px;
  
  .section-tag {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c165ff;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 2.3rem;
    font-weight: 800;
    margin-bottom: 12px;
    color: #ffffff;
    letter-spacing: -0.5px;
  }
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.5;
  }
`

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 22px;
  width: 100%;
  margin-bottom: 60px;
`

const FeatureCard = styled.div`
  padding: 30px 24px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 22px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  min-height: 290px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  
  .card-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.85);
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 750;
    margin: 0 0 10px 0;
    color: #ffffff;
  }
  
  p {
    font-size: 0.95rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
  }
  
  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(193, 101, 255, 0.25);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.3);
  }
`

const IconWrapper = styled.div<{ isExternal?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: ${props => props.isExternal ? 'rgba(0, 212, 255, 0.1)' : 'rgba(193, 101, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: ${props => props.isExternal ? '#00D4FF' : '#c165ff'};
  margin-bottom: 22px;
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.08);
  }
`

const CardCTA = styled.div<{ isExternal?: boolean }>`
  margin-top: 24px;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${props => props.isExternal ? '#00D4FF' : '#c165ff'};
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  
  svg {
    transition: transform 0.2s;
  }
  
  ${FeatureCard}:hover & {
    svg {
      transform: translateX(4px);
    }
  }
`

const CardLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CardAnchor = styled.a`
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

// Bottom Final CTA (Peak-End Rule / Goal-Gradient Effect)
const FinalCtaSection = styled.div`
  width: 100%;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(118, 0, 147, 0.35) 0%, rgba(20, 10, 30, 0.8) 100%);
  border: 1px solid rgba(193, 101, 255, 0.3);
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 36px 20px;
  }

  h3 {
    font-size: 2.2rem;
    font-weight: 850;
    color: #ffffff;
    margin: 0 0 14px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.75);
    max-width: 600px;
    margin: 0 0 32px;
    line-height: 1.55;
  }

  .cta-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }
  }
`

// Keyframe Animations
const keyframes = {
  fadeInDown: `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeInUp: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
}

export function LandingPage(): JSX.Element {
  return (
    <FullScreenWrapper>
      <style>{Object.values(keyframes).join('\n')}</style>
      <Container>
        {/* Hero Badge */}
        <HeroBadge>
          <span /> Next-Gen Intent Trading • 0% Gas on Fails • Full MEV Shield
        </HeroBadge>

        {/* Hero Section (Von Restorff Effect & Hick's Law) */}
        <HeroSection>
          <h1>Trade Smarter, Keep Every Drop of Surplus</h1>
          <p>
            Chameleon Swap routes your trades across competing solver networks, protecting you from sandwich attacks, frontrunning, and slippage exploitation across 10+ chains.
          </p>
          <ButtonGroup>
            <AnimatedPrimaryButton as={Link} to={Routes.SWAPS}>
              Start Trading <FiArrowRight />
            </AnimatedPrimaryButton>
            <SecondaryButton onClick={() => document.getElementById('trading-suite')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Modules
            </SecondaryButton>
          </ButtonGroup>
        </HeroSection>

        {/* Live Metrics Bar (Miller's Law / Proof Points) */}
        <StatsStrip>
          <StatItem>
            <div className="stat-value">100%</div>
            <div className="stat-label">MEV Shielded</div>
          </StatItem>
          <StatItem>
            <div className="stat-value">$0.00</div>
            <div className="stat-label">Gas on Failed Swaps</div>
          </StatItem>
          <StatItem>
            <div className="stat-value">20+</div>
            <div className="stat-label">Competing Solvers</div>
          </StatItem>
          <StatItem>
            <div className="stat-value">10+</div>
            <div className="stat-label">Chains Supported</div>
          </StatItem>
        </StatsStrip>

        {/* Core Pillars (Chameleon AMM & MEV Shield) */}
        <TopicList>
          <TopicCard>
            <div>
              <h4><FiZap style={{ color: '#c165ff' }} /> Solver Competition</h4>
              <p>
                Trades are executed by a decentralized network of solvers competing in batch auctions to find you optimal liquidity across Uniswap, PancakeSwap, Curve, Balancer, and private makers.
              </p>
            </div>
            <Link to={Routes.SWAPS}>
              Start Swapping <FiArrowRight />
            </Link>
          </TopicCard>
          
          <TopicCard>
            <div>
              <h4><FiShield style={{ color: '#c165ff' }} /> Guaranteed MEV Protection</h4>
              <p>
                Eliminate sandwich attacks and predatory bots forever. Orders execute off-chain via cryptographic intent signatures with positive slippage captured and rebated directly to you.
              </p>
            </div>
            <a href="https://docs.chameleon.exchange" target="_blank" rel="noopener noreferrer">
              Read Security Docs <FiArrowUpRight />
            </a>
          </TopicCard>
        </TopicList>

        {/* Trading Engines Header */}
        <SectionHeader id="trading-suite">
          <div className="section-tag">Core Trading Suite</div>
          <h2>Optimized Trading Engines</h2>
          <p>
            Four dedicated execution engines built for retail and institutional traders alike.
          </p>
        </SectionHeader>

        {/* 4 Core Trading Feature Cards */}
        <FeaturesContainer>
          {/* Card 1: Swaps */}
          <FeatureCard>
            <span className="card-badge">Gasless</span>
            <CardLink to={Routes.SWAPS}>
              <div>
                <IconWrapper>
                  <FiZap />
                </IconWrapper>
                <h3>Instant Swaps</h3>
                <p>Sign an intent and receive optimal prices with zero gas needed for failed trades.</p>
              </div>
              <CardCTA>
                Swap Now <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>

          {/* Card 2: Limit Orders */}
          <FeatureCard>
            <span className="card-badge">0% Fees to Cancel</span>
            <CardLink to={Routes.LIMIT}>
              <div>
                <IconWrapper>
                  <FiTarget />
                </IconWrapper>
                <h3>Limit Orders</h3>
                <p>Set precise target triggers. Free to place and free to cancel anytime.</p>
              </div>
              <CardCTA>
                Set Order <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>

          {/* Card 3: TWAP */}
          <FeatureCard>
            <span className="card-badge">Anti-Impact</span>
            <CardLink to={Routes.ADVANCED}>
              <div>
                <IconWrapper>
                  <FiClock />
                </IconWrapper>
                <h3>TWAP Trading</h3>
                <p>Split large orders into time intervals to minimize slippage and price impact.</p>
              </div>
              <CardCTA>
                Try TWAP <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>

          {/* Card 4: Buy Crypto */}
          <FeatureCard>
            <span className="card-badge">Fiat Onramp</span>
            <CardLink to={Routes.BUY}>
              <div>
                <IconWrapper>
                  <FiCreditCard />
                </IconWrapper>
                <h3>Buy Crypto</h3>
                <p>Purchase crypto with card or bank transfer directly into your self-custodial wallet.</p>
              </div>
              <CardCTA>
                Buy Now <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>
        </FeaturesContainer>

        {/* Ecosystem Suite Header */}
        <SectionHeader style={{ marginTop: '20px' }}>
          <div className="section-tag">Ecosystem Modules</div>
          <h2>Extended DeFi Modules</h2>
          <p>
            Seamlessly access perpetuals, prediction markets, lending, and staking under one roof.
          </p>
        </SectionHeader>

        {/* 4 Ecosystem Feature Cards */}
        <FeaturesContainer>
          {/* Card 5: Perpetuals */}
          <FeatureCard>
            <span className="card-badge">Up to 50x</span>
            <CardAnchor href="https://perpetual.chameleon.exchange/" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiTrendingUp />
                </IconWrapper>
                <h3>Perpetuals</h3>
                <p>Trade long and short positions on major crypto assets with up to 50x leverage.</p>
              </div>
              <CardCTA isExternal={true}>
                Trade Futures <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>

          {/* Card 6: Arena */}
          <FeatureCard>
            <span className="card-badge">Prediction Markets</span>
            <CardAnchor href="https://defi.chameleon.exchange/arena" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiTarget />
                </IconWrapper>
                <h3>Prediction Arena</h3>
                <p>Trade event shares on sports, politics, crypto prices, and global outcomes.</p>
              </div>
              <CardCTA isExternal={true}>
                Enter Arena <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>

          {/* Card 7: Lending */}
          <FeatureCard>
            <span className="card-badge">Supply & Borrow</span>
            <CardAnchor href="https://defi.chameleon.exchange/lending" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiActivity />
                </IconWrapper>
                <h3>Lending & Yield</h3>
                <p>Deposit crypto collateral to earn variable APY yields or borrow against your holdings.</p>
              </div>
              <CardCTA isExternal={true}>
                Supply Assets <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>

          {/* Card 8: Staking */}
          <FeatureCard>
            <span className="card-badge">Protocol Rebates</span>
            <CardAnchor href="https://defi.chameleon.exchange/staking" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiAward />
                </IconWrapper>
                <h3>Secure Staking</h3>
                <p>Stake governance tokens to receive protocol fee revenue distributions and rewards.</p>
              </div>
              <CardCTA isExternal={true}>
                Stake Now <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>
        </FeaturesContainer>

        {/* Final CTA Section (Peak-End Rule / Rule 10) */}
        <FinalCtaSection>
          <h3>Ready to Trade with Full MEV Protection?</h3>
          <p>
            Connect your wallet and experience the fastest, most protected decentralized trading platform on Ethereum, BNB Chain, Base, Arbitrum, and beyond.
          </p>
          <div className="cta-buttons">
            <AnimatedPrimaryButton as={Link} to={Routes.SWAPS}>
              Launch Chameleon Swap <FiArrowRight />
            </AnimatedPrimaryButton>
            <SecondaryButton as="a" href="https://docs.chameleon.exchange" target="_blank" rel="noopener noreferrer">
              <FiBookOpen /> View Documentation
            </SecondaryButton>
          </div>
        </FinalCtaSection>
      </Container>
    </FullScreenWrapper>
  )
}