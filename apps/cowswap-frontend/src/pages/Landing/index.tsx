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
  FiArrowRight 
} from 'react-icons/fi'
import { Routes } from 'common/constants/routes'

const FullScreenWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px 100px;
`

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// Hero Section
const HeroSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  max-width: 800px;
  margin-bottom: 60px;
  
  h1 {
    font-size: 3.8rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -1.5px;
    background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeInDown 0.8s ease-out;
    
    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
    animation: fadeIn 1.2s ease-out;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
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
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`

const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 36px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

// Core Pillars (TopicList / TopicCard)
const TopicList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  width: 100%;
  margin-bottom: 80px;
  animation: fadeInUp 1s ease-out;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const TopicCard = styled.div`
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 36px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-height: 250px;
  
  h4 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 14px 0;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  p {
    font-size: 1.05rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 24px 0;
  }
  
  a {
    align-self: flex-start;
    color: #ff65ff;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    
    svg {
      transition: transform 0.2s;
    }
    
    &:hover {
      filter: brightness(1.2);
      svg {
        transform: translateX(4px);
      }
    }
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 101, 255, 0.2);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 101, 255, 0.05);
  }
`

// Grid of 8 Features
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
  max-width: 600px;
  
  h2 {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 12px;
    color: #ffffff;
  }
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.4;
  }
`

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  width: 100%;
  margin-bottom: 60px;
`

const FeatureCard = styled.div`
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  min-height: 300px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  
  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    color: #ffffff;
  }
  
  p {
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
  }
  
  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  }
`

const IconWrapper = styled.div<{ isExternal?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  color: #ffffff;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    background: ${props => props.isExternal ? 'rgba(0, 212, 255, 0.12)' : 'rgba(255, 101, 255, 0.12)'};
    color: ${props => props.isExternal ? '#00D4FF' : '#ff65ff'};
    transform: scale(1.05);
  }
`

const CardCTA = styled.div<{ isExternal?: boolean }>`
  margin-top: 24px;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${props => props.isExternal ? '#00D4FF' : '#ff65ff'};
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
`

const CardAnchor = styled.a`
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
`

// Keyframe Animations
const keyframes = {
  fadeInDown: `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
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
        transform: translateY(20px);
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
        {/* Hero Section */}
        <HeroSection>
          <h1>Welcome to Chameleon Swap</h1>
          <p>
            Experience the next generation of decentralized trading. Swap assets with gasless routing and complete MEV protection, or trade leverage futures, prediction markets, lending, and staking.
          </p>
          <ButtonGroup>
            <AnimatedPrimaryButton as={Link} to={Routes.SWAPS}>
              Start Trading <FiArrowRight />
            </AnimatedPrimaryButton>
            <SecondaryButton onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Modules
            </SecondaryButton>
          </ButtonGroup>
        </HeroSection>

        {/* Core Pillars (Chameleon AMM & MEV Blocker) */}
        <TopicList>
          <TopicCard>
            <div>
              <h4><FiZap style={{ color: '#ff65ff' }} /> Chameleon AMM</h4>
              <p>
                Trade with confidence. Chameleon outsources trade execution to a network of independent solvers who compete to find the best prices across Uniswap, Curve, Balancer, and private pools.
              </p>
            </div>
            <Link to={Routes.SWAPS}>
              Trade instantly <FiArrowRight />
            </Link>
          </TopicCard>
          
          <TopicCard>
            <div>
              <h4><FiShield style={{ color: '#ff65ff' }} /> MEV Blocker</h4>
              <p>
                Complete protection from front-running and sandwich bots. $208B+ volume protected, across 46M+ transactions, with over 4.6K+ ETH in searcher surplus rebated directly to user wallets.
              </p>
            </div>
            <a href="https://cow.fi/mev-blocker" target="_blank" rel="noopener noreferrer">
              View Dune stats <FiArrowUpRight />
            </a>
          </TopicCard>
        </TopicList>

        {/* Feature Grid Header */}
        <SectionHeader id="features">
          <h2>Chameleon DeFi Suite</h2>
          <p>
            Unlock the power of our multi-functional decentralized platform.
          </p>
        </SectionHeader>

        {/* 8 Feature Cards */}
        <FeaturesContainer>
          {/* Card 1: Swaps (Internal) */}
          <FeatureCard>
            <CardLink to={Routes.SWAPS}>
              <div>
                <IconWrapper>
                  <FiZap />
                </IconWrapper>
                <h3>Instant Swaps</h3>
                <p>Execute trades instantly with gasless signature routing and near-zero slippage.</p>
              </div>
              <CardCTA>
                Swap Now <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>

          {/* Card 2: Limit Orders (Internal) */}
          <FeatureCard>
            <CardLink to={Routes.LIMIT}>
              <div>
                <IconWrapper>
                  <FiTarget />
                </IconWrapper>
                <h3>Limit Orders</h3>
                <p>Trade at your precise desired price. Orders only execute once target triggers match.</p>
              </div>
              <CardCTA>
                Set Order <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>

          {/* Card 3: TWAP (Internal) */}
          <FeatureCard>
            <CardLink to={Routes.ADVANCED}>
              <div>
                <IconWrapper>
                  <FiClock />
                </IconWrapper>
                <h3>TWAP Trading</h3>
                <p>Split large transactions over predefined time blocks to achieve better average price fills.</p>
              </div>
              <CardCTA>
                Try TWAP <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>

          {/* Card 4: Buy Crypto (Internal) */}
          <FeatureCard>
            <CardLink to={Routes.BUY}>
              <div>
                <IconWrapper>
                  <FiCreditCard />
                </IconWrapper>
                <h3>Buy Crypto</h3>
                <p>Seamlessly purchase any crypto asset directly using your debit card or bank transfer.</p>
              </div>
              <CardCTA>
                Buy Now <FiArrowRight />
              </CardCTA>
            </CardLink>
          </FeatureCard>

          {/* Card 5: Perpetuals (External) */}
          <FeatureCard>
            <CardAnchor href="https://perpetual.chameleon.exchange/" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiTrendingUp />
                </IconWrapper>
                <h3>Perpetuals</h3>
                <p>Open long or short positions on major assets with up to 50x leverage and deep liquidity.</p>
              </div>
              <CardCTA isExternal={true}>
                Trade Futures <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>

          {/* Card 6: Arena / Prediction Markets (External) */}
          <FeatureCard>
            <CardAnchor href="https://defi.chameleon.exchange/arena" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiTarget />
                </IconWrapper>
                <h3>Prediction Arena</h3>
                <p>Speculate and trade event outcome shares on sports, prices, politics, and culture.</p>
              </div>
              <CardCTA isExternal={true}>
                Enter Arena <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>

          {/* Card 7: Lending (External) */}
          <FeatureCard>
            <CardAnchor href="https://defi.chameleon.exchange/lending" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiActivity />
                </IconWrapper>
                <h3>Lending & Yield</h3>
                <p>Supply collateral to earn variable interest rate yields or borrow against your assets.</p>
              </div>
              <CardCTA isExternal={true}>
                Supply Assets <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>

          {/* Card 8: Staking (External) */}
          <FeatureCard>
            <CardAnchor href="https://defi.chameleon.exchange/staking" target="_blank" rel="noopener noreferrer">
              <div>
                <IconWrapper isExternal={true}>
                  <FiAward />
                </IconWrapper>
                <h3>Secure Staking</h3>
                <p>Stake your governance tokens to earn staking rewards and claim protocol fee rebates.</p>
              </div>
              <CardCTA isExternal={true}>
                Stake Now <FiArrowUpRight />
              </CardCTA>
            </CardAnchor>
          </FeatureCard>
        </FeaturesContainer>
      </Container>
    </FullScreenWrapper>
  )
}