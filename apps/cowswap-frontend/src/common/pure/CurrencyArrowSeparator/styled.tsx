import { UI } from '@cowprotocol/ui'

import { ArrowDown } from 'react-feather'
import styled, { css } from 'styled-components/macro'

import { loadingAnimationMixin } from './style-mixins'

export const Box = styled.div<{
  isCollapsed: boolean
  hasSeparatorLine?: boolean
}>`
  display: block;
  margin: ${({ isCollapsed }) => (isCollapsed ? '-13px auto' : '2px auto')};
  color: inherit;
  position: relative;
  z-index: 2;
  width: 100%;
  height: 26px;
  justify-content: center;
  transition: width var(${UI.ANIMATION_DURATION}) ease-in-out;
  pointer-events: none;

  ${({ hasSeparatorLine }) =>
    hasSeparatorLine &&
    css`
      &::before {
        content: '';
        position: absolute;
        width: calc(100% + 16px);
        left: -8px;
        top: calc(50% - 1px);
        height: 1px;
        background: var(${UI.COLOR_PAPER_DARKER});
      }
    `}
`

export const LoadingWrapper = styled.button<{ $isLoading: boolean }>`
  --size: 26px;

  position: absolute;
  left: calc(50% - var(--size) / 2);
  top: 0;
  bottom: 0;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 0.25s;
  box-shadow: 0 0 0 3px var(${UI.COLOR_PAPER});
  background: var(${UI.COLOR_PAPER_DARKER});
  color: inherit;
  border-radius: 8px;
  width: var(--size);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;

  &:disabled {
    cursor: not-allowed;
  }

  ${({ $isLoading }) =>
    $isLoading
      ? loadingAnimationMixin
      : css`
          &:not(:disabled):hover {
            transform: translateY(-2px);
          }
        `}
`

export const ArrowDownIcon = styled(ArrowDown)<{ disabled: boolean }>`
  display: block;
  margin: auto;
  stroke: currentColor;
  stroke-width: 3px;
  padding: 0;
  height: 100%;
  width: 20px;
  cursor: inherit;
  color: inherit;
`

export const ChameleonLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.paperCustom || 'transparent'};

  svg,
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    animation: chameleonPulse 1.4s ease-in-out infinite alternate;
  }

  @keyframes chameleonPulse {
    0% {
      transform: scale(0.88) rotate(-6deg);
      filter: drop-shadow(0 0 2px rgba(193, 101, 255, 0.4));
    }
    50% {
      transform: scale(1.06) rotate(0deg);
      filter: drop-shadow(0 0 5px rgba(118, 0, 147, 0.7));
    }
    100% {
      transform: scale(0.94) rotate(6deg);
      filter: drop-shadow(0 0 2px rgba(193, 101, 255, 0.4));
    }
  }
`
