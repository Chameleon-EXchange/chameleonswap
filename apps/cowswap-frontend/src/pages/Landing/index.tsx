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
  FiBookOpen,
  FiLayers,
  FiPercent,
  FiSliders
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

// Live Stats Strip
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
  margin-bottom: 44px;
  max-width: 680px;
  
  .section-tag {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c165ff;
    text-transform: uppercase;
    letter-spacing: 1.2px;
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

/* ==========================================================
   SECTION 1: BENTO GRID FOR TRADING ENGINES (Asymmetrical)
   ========================================================== */
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  width: 100%;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const BentoHeroCard = styled(Link)`
  grid-row: span 2;
  text-decoration: none;
  background: linear-gradient(145deg, rgba(28, 12, 42, 0.7) 0%, rgba(14, 6, 24, 0.9) 100%);
  border: 1px solid rgba(193, 101, 255, 0.25);
  border-radius: 26px;
  padding: 38px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(193, 101, 255, 0.5);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 30px rgba(118, 0, 147, 0.25);
  }

  .engine-badge {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 10px;
    background: rgba(193, 101, 255, 0.15);
    color: #c165ff;
    font-size: 0.8rem;
    font-weight: 750;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.95rem;
    font-weight: 850;
    color: #ffffff;
    margin: 0 0 14px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0 0 30px;
  }
`

// Visual Order Route Box inside the Bento Hero Card
const RouteSimulator = styled.div`
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .simulator-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .route-nodes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.03);
    padding: 12px 16px;
    border-radius: 12px;

    .token-chip {
      font-weight: 800;
      color: #ffffff;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .solver-pulse {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      color: #00ff87;
      font-weight: 700;
      background: rgba(0, 255, 135, 0.1);
      padding: 4px 10px;
      border-radius: 8px;
    }
  }

  .route-result {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.88rem;

    .surplus-tag {
      color: #00ff87;
      font-weight: 750;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .gas-tag {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 600;
    }
  }
`

const BentoActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #c165ff;
  font-size: 1.05rem;
  font-weight: 750;
  transition: all 0.2s;

  svg {
    transition: transform 0.2s;
  }

  ${BentoHeroCard}:hover & svg {
    transform: translateX(6px);
  }
`

const BentoSmallCard = styled(Link)`
  text-decoration: none;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(193, 101, 255, 0.3);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .engine-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(193, 101, 255, 0.12);
    color: #c165ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
  }

  .status-badge {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.8);
  }

  h3 {
    font-size: 1.35rem;
    font-weight: 750;
    color: #ffffff;
    margin: 0 0 10px;
  }

  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.5;
    margin: 0 0 18px;
  }

  .mini-visual {
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 14px;
    border-radius: 10px;
    margin-bottom: 18px;
    font-size: 0.82rem;
    color: #ffffff;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-cta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.95rem;
    font-weight: 700;
    color: #c165ff;
    transition: all 0.2s;

    svg {
      transition: transform 0.2s;
    }
  }

  &:hover .card-cta svg {
    transform: translateX(4px);
  }
`

const BentoWideCard = styled(Link)`
  grid-column: 1 / -1;
  text-decoration: none;
  background: linear-gradient(90deg, rgba(20, 10, 30, 0.8) 0%, rgba(30, 15, 45, 0.5) 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 22px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(193, 101, 255, 0.35);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }

  .left-content {
    display: flex;
    align-items: center;
    gap: 20px;

    .icon-box {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(0, 212, 255, 0.1);
      color: #00D4FF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 750;
      color: #ffffff;
      margin: 0 0 4px;
    }

    p {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.65);
      margin: 0;
    }
  }

  .payment-chips {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    span {
      font-size: 0.8rem;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
  }
`


/* ==========================================================
   SECTION 2: PANORAMIC ECOSYSTEM SHOWCASE (Distinct Horizontal Strips)
   ========================================================== */
const EcosystemDeck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-bottom: 70px;
`

const EcosystemModuleStrip = styled.a<{ accentColor: string }>`
  text-decoration: none;
  background: linear-gradient(135deg, rgba(16, 8, 26, 0.7) 0%, rgba(8, 4, 14, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid ${props => props.accentColor};
  border-radius: 22px;
  padding: 32px 36px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  align-items: center;
  gap: 32px;
  backdrop-filter: blur(14px);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 26px 22px;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.18);
    border-left: 4px solid ${props => props.accentColor};
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 25px ${props => `${props.accentColor}22`};
  }

  .module-info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .module-category {
      font-size: 0.8rem;
      font-weight: 750;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: ${props => props.accentColor};
    }

    h3 {
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.3px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    p {
      font-size: 0.98rem;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.55;
      margin: 4px 0 16px;
    }

    .cta-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.96rem;
      font-weight: 750;
      color: ${props => props.accentColor};
      transition: all 0.2s;

      svg {
        transition: transform 0.2s;
      }
    }
  }

  &:hover .cta-link svg {
    transform: translate(2px, -2px);
  }

  .module-preview {
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`

const PreviewMetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;

  .metric-label {
    color: rgba(255, 255, 255, 0.55);
    font-weight: 600;
  }

  .metric-value {
    color: #ffffff;
    font-weight: 800;
  }
`

const OddsBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .odds-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
  }

  .odds-bar {
    display: flex;
    height: 10px;
    border-radius: 999px;
    overflow: hidden;

    .bar-yes {
      background: #00ff87;
      width: 72%;
    }

    .bar-no {
      background: #ff4757;
      width: 28%;
    }
  }

  .odds-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 750;

    .yes-label {
      color: #00ff87;
    }
    .no-label {
      color: #ff4757;
    }
  }
`

// Final CTA Section (Peak-End Rule / Rule 10)
const FinalCtaSection = styled.div`
  width: 100%;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(118, 0, 147, 0.4) 0%, rgba(20, 10, 30, 0.85) 100%);
  border: 1px solid rgba(193, 101, 255, 0.35);
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
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

        {/* Hero Section */}
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

        {/* Live Metrics Bar */}
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

        {/* Core Pillars (Solver Competition & MEV Shield) */}
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

        {/* SECTION 1: TRADING ENGINES (Asymmetrical Bento Matrix) */}
        <SectionHeader id="trading-suite">
          <div className="section-tag">Core Execution Infrastructure</div>
          <h2>Optimized Trading Engines</h2>
          <p>
            Built for traders demanding maximum price efficiency, zero failed transaction costs, and deep liquidity aggregation.
          </p>
        </SectionHeader>

        <BentoGrid>
          {/* Bento Item 1 (Spanning Hero Card): Instant Swaps */}
          <BentoHeroCard to={Routes.SWAPS}>
            <div>
              <div className="engine-badge">
                <FiZap /> Flagship Intent Engine
              </div>
              <h3>Instant Gasless Swaps</h3>
              <p>
                Execute swaps via cryptographic intent signatures. Over 20 independent solvers compete simultaneously in batch auctions, routing liquidity through Uniswap, PancakeSwap, Curve, and private market makers with guaranteed MEV immunity.
              </p>
              {/* Live Order Route Visualizer */}
              <RouteSimulator>
                <div className="simulator-header">
                  <span>Batch Auction Routing</span>
                  <span style={{ color: '#00ff87' }}>Live Solver Match</span>
                </div>
                <div className="route-nodes">
                  <div className="token-chip">1.00 ETH</div>
                  <div className="solver-pulse">
                    <FiSliders /> Competing Solvers
                  </div>
                  <div className="token-chip" style={{ color: '#00D4FF' }}>3,258.40 USDT</div>
                </div>
                <div className="route-result">
                  <span className="surplus-tag">
                    <FiCheckCircle /> +$18.40 Surplus Captured
                  </span>
                  <span className="gas-tag">Gas: $0.00 on Fails</span>
                </div>
              </RouteSimulator>
            </div>
            <BentoActionRow>
              Launch Instant Swap <FiArrowRight />
            </BentoActionRow>
          </BentoHeroCard>

          {/* Bento Item 2: Limit Orders */}
          <BentoSmallCard to={Routes.LIMIT}>
            <div>
              <div className="card-top">
                <div className="engine-icon">
                  <FiTarget />
                </div>
                <span className="status-badge">0 Gas to Cancel</span>
              </div>
              <h3>Surplus Limit Orders</h3>
              <p>
                Set exact trigger targets. Orders only execute when matching market liquidity arrives, automatically capturing favorable price spikes.
              </p>
              <div className="mini-visual">
                <span>Target: BNB @ $580.00</span>
                <span style={{ color: '#00ff87' }}>+0.42% Surplus</span>
              </div>
            </div>
            <div className="card-cta">
              Create Limit Order <FiArrowRight />
            </div>
          </BentoSmallCard>

          {/* Bento Item 3: TWAP */}
          <BentoSmallCard to={Routes.ADVANCED}>
            <div>
              <div className="card-top">
                <div className="engine-icon">
                  <FiClock />
                </div>
                <span className="status-badge">Zero Impact</span>
              </div>
              <h3>TWAP Execution</h3>
              <p>
                Divide institutional or whale trades into scheduled intervals over time, preventing slippage penalties and frontrunning traps.
              </p>
              <div className="mini-visual">
                <span>Batch Slicing</span>
                <span style={{ color: '#c165ff' }}>4 of 4 Intervals</span>
              </div>
            </div>
            <div className="card-cta">
              Configure TWAP <FiArrowRight />
            </div>
          </BentoSmallCard>

          {/* Bento Item 4: Wide Fiat Gateway */}
          <BentoWideCard to={Routes.BUY}>
            <div className="left-content">
              <div className="icon-box">
                <FiCreditCard />
              </div>
              <div>
                <h3>Direct Fiat On-Ramp</h3>
                <p>Purchase crypto with cards or bank transfer straight into your self-custodial wallet.</p>
              </div>
            </div>
            <div className="payment-chips">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Apple Pay</span>
              <span>SEPA</span>
              <span style={{ color: '#00D4FF' }}>Buy Crypto ↗</span>
            </div>
          </BentoWideCard>
        </BentoGrid>

        {/* SECTION 2: EXTENDED DEFI MODULES (Panoramic Showcase Strips) */}
        <SectionHeader style={{ marginTop: '10px' }}>
          <div className="section-tag" style={{ color: '#00D4FF' }}>Ecosystem Architecture</div>
          <h2>Extended DeFi Modules</h2>
          <p>
            Experience a full-spectrum decentralized finance suite powered by the Chameleon unified ecosystem.
          </p>
        </SectionHeader>

        <EcosystemDeck>
          {/* Module 1: Perpetuals (Cyan Theme) */}
          <EcosystemModuleStrip
            href="https://perpetual.chameleon.exchange/"
            target="_blank"
            rel="noopener noreferrer"
            accentColor="#00D4FF"
          >
            <div className="module-info">
              <span className="module-category">Derivatives & Margin</span>
              <h3>
                <FiTrendingUp style={{ color: '#00D4FF' }} /> Institutional Perpetual Futures
              </h3>
              <p>
                Open decentralized long and short contracts on BTC, ETH, and top altcoins with up to 50x leverage, deep synthetic liquidity, and zero slippage on execution.
              </p>
              <div className="cta-link">
                Launch Futures Terminal <FiArrowUpRight />
              </div>
            </div>
            <div className="module-preview">
              <PreviewMetricRow>
                <span className="metric-label">Max Leverage</span>
                <span className="metric-value" style={{ color: '#00D4FF' }}>50x</span>
              </PreviewMetricRow>
              <PreviewMetricRow>
                <span className="metric-label">Taker Execution Fee</span>
                <span className="metric-value">0.02%</span>
              </PreviewMetricRow>
              <PreviewMetricRow>
                <span className="metric-label">Supported Markets</span>
                <span className="metric-value">BTC, ETH, SOL, BNB</span>
              </PreviewMetricRow>
            </div>
          </EcosystemModuleStrip>

          {/* Module 2: Prediction Arena (Magenta Theme) */}
          <EcosystemModuleStrip
            href="https://defi.chameleon.exchange/arena"
            target="_self"
            accentColor="#ff65ff"
          >
            <div className="module-info">
              <span className="module-category">Binary Event Contracts</span>
              <h3>
                <FiTarget style={{ color: '#ff65ff' }} /> Chameleon Prediction Arena
              </h3>
              <p>
                Speculate on event outcomes across crypto prices, global economics, sports, and culture. Trade liquid YES/NO share contracts with instantaneous on-chain payouts.
              </p>
              <div className="cta-link">
                Enter Prediction Arena <FiArrowUpRight />
              </div>
            </div>
            <div className="module-preview">
              <OddsBarWrapper>
                <div className="odds-title">Market: Will BTC cross $120k in Q4?</div>
                <div className="odds-bar">
                  <div className="bar-yes" />
                  <div className="bar-no" />
                </div>
                <div className="odds-labels">
                  <span className="yes-label">YES: 72% (1.38x)</span>
                  <span className="no-label">NO: 28% (3.57x)</span>
                </div>
              </OddsBarWrapper>
            </div>
          </EcosystemModuleStrip>

          {/* Module 3: Lending & Yield (Emerald Theme) */}
          <EcosystemModuleStrip
            href="https://defi.chameleon.exchange/lending"
            target="_self"
            accentColor="#00ff87"
          >
            <div className="module-info">
              <span className="module-category">Decentralized Credit</span>
              <h3>
                <FiActivity style={{ color: '#00ff87' }} /> Autonomous Lending & Yield
              </h3>
              <p>
                Supply digital assets to earn transparent algorithmic APY returns or access instant liquidity against your collateral without liquidating your portfolio upside.
              </p>
              <div className="cta-link">
                Access Money Markets <FiArrowUpRight />
              </div>
            </div>
            <div className="module-preview">
              <PreviewMetricRow>
                <span className="metric-label">USDC Deposit Yield</span>
                <span className="metric-value" style={{ color: '#00ff87' }}>8.42% APY</span>
              </PreviewMetricRow>
              <PreviewMetricRow>
                <span className="metric-label">USDT Deposit Yield</span>
                <span className="metric-value" style={{ color: '#00ff87' }}>7.95% APY</span>
              </PreviewMetricRow>
              <PreviewMetricRow>
                <span className="metric-label">Collateral Architecture</span>
                <span className="metric-value">Over-Collateralized</span>
              </PreviewMetricRow>
            </div>
          </EcosystemModuleStrip>

          {/* Module 4: Staking & Revenue Share (Gold Theme) */}
          <EcosystemModuleStrip
            href="https://defi.chameleon.exchange/staking"
            target="_self"
            accentColor="#FFB800"
          >
            <div className="module-info">
              <span className="module-category">Protocol Revenue & Governance</span>
              <h3>
                <FiAward style={{ color: '#FFB800' }} /> Stake CHAM, Earn Real Yield
              </h3>
              <p>
                Lock CHAM tokens to participate in protocol governance, receive weekly protocol swap fee revenue distributions, and unlock referral point multipliers.
              </p>
              <div className="cta-link">
                Stake Tokens & Earn <FiArrowUpRight />
              </div>
            </div>
            <div className="module-preview">
              <PreviewMetricRow>
                <span className="metric-label">Fee Share Currency</span>
                <span className="metric-value" style={{ color: '#FFB800' }}>Real Yield (ETH / USDT)</span>
              </PreviewMetricRow>
              <PreviewMetricRow>
                <span className="metric-label">Swap Loyalty Reward</span>
                <span className="metric-value">+50 Points per Trade</span>
              </PreviewMetricRow>
              <PreviewMetricRow>
                <span className="metric-label">Governance Power</span>
                <span className="metric-value">1 CHAM = 1 Vote</span>
              </PreviewMetricRow>
            </div>
          </EcosystemModuleStrip>
        </EcosystemDeck>

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