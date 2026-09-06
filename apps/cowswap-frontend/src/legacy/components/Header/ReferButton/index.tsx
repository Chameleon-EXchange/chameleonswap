import { useCallback } from 'react'
import { UserPlus } from 'react-feather'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useWalletInfo } from '@cowprotocol/wallet'

const StyledReferButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid ${({ $isActive }) => ($isActive ? 'rgba(0, 255, 135, 0.45)' : 'rgba(255, 255, 255, 0.08)')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(0, 255, 135, 0.12)' : 'rgba(21, 18, 38, 0.85)')};
  color: #00ff87;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);

  &:hover {
    background: rgba(0, 255, 135, 0.16);
    border-color: rgba(0, 255, 135, 0.5);
    color: #38ffaa;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0, 255, 135, 0.18);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    stroke: currentColor;
    width: 16px;
    height: 16px;
    stroke-width: 2.2;
    flex-shrink: 0;
  }

  span {
    line-height: 1;
  }
`

export function ReferButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const { chainId } = useWalletInfo()
  const isActive = location.pathname.includes('/reward') || location.pathname.includes('/refer')

  const handleClick = useCallback(() => {
    navigate(chainId ? `/${chainId}/rewardpage` : '/rewardpage')
  }, [navigate, chainId])

  return (
    <StyledReferButton onClick={handleClick} $isActive={isActive} title="Refer traders & earn rewards">
      <UserPlus />
      <span>Refer</span>
    </StyledReferButton>
  )
}
