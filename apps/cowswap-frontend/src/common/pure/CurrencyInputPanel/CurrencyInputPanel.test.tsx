import React from 'react'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

import { COW_TOKEN_TO_CHAIN } from '@cowprotocol/common-const'
import { SupportedChainId } from '@cowprotocol/cow-sdk'
import { CurrencyAmount } from '@cowprotocol/currency'

import { fireEvent, render, type RenderResult, screen } from '@testing-library/react'

import { CurrencyInputPanel, CurrencyInputPanelProps } from './CurrencyInputPanel'
import { defaultCurrencyInputPanelProps } from './defaultCurrencyInputProps'

// Mock CurrencySelectButton to avoid deep module tree importing transactionService
jest.mock('common/pure/CurrencySelectButton', () => ({
  CurrencySelectButton: () => <button type="button">Select Token</button>,
}))

jest.mock('../ReceiveAmount', () => ({
  ReceiveAmount: () => null,
}))

jest.mock('modules/usdAmount', () => ({
  useUsdAmount: (amount: unknown) => ({ value: amount }),
  useUsdPrice: () => null,
}))

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

const renderWithI18n = (props: CurrencyInputPanelProps): RenderResult =>
  render(
    <I18nProvider i18n={i18n}>
      <CurrencyInputPanel {...props} />
    </I18nProvider>,
  )

const currency = COW_TOKEN_TO_CHAIN[SupportedChainId.MAINNET]
// 100 COW tokens (18 decimals)
const balance = currency ? CurrencyAmount.fromRawAmount(currency, 100n * 10n ** 18n) : undefined
const maxBalance = balance

describe('CurrencyInputPanel percentage shortcuts', () => {
  it('renders 25%, 50%, 75%, and Max buttons when showSetMax is true and balance > 0', () => {
    renderWithI18n({
      ...defaultCurrencyInputPanelProps,
      showSetMax: true,
      maxBalance,
      currencyInfo: {
        ...defaultCurrencyInputPanelProps.currencyInfo,
        currency,
        balance,
        amount: null,
      },
    })

    const btn25 = screen.getByTestId('percent-25-button')
    expect(btn25).toBeTruthy()
    expect(btn25.textContent).toBe('25%')

    const btn50 = screen.getByTestId('percent-50-button')
    expect(btn50).toBeTruthy()
    expect(btn50.textContent).toBe('50%')

    const btn75 = screen.getByTestId('percent-75-button')
    expect(btn75).toBeTruthy()
    expect(btn75.textContent).toBe('75%')

    const btn100 = screen.getByTestId('percent-100-button')
    expect(btn100).toBeTruthy()
    expect(btn100.textContent).toBe('Max')
  })

  it('does not render percentage shortcuts when showSetMax is false', () => {
    renderWithI18n({
      ...defaultCurrencyInputPanelProps,
      showSetMax: false,
      maxBalance,
      currencyInfo: {
        ...defaultCurrencyInputPanelProps.currencyInfo,
        currency,
        balance,
      },
    })

    expect(screen.queryByTestId('percent-25-button')).toBeNull()
    expect(screen.queryByTestId('percent-100-button')).toBeNull()
  })

  it('calls onUserInput with 25% of maxBalance when 25% button is clicked', () => {
    const onUserInput = jest.fn()
    renderWithI18n({
      ...defaultCurrencyInputPanelProps,
      onUserInput,
      showSetMax: true,
      maxBalance,
      currencyInfo: {
        ...defaultCurrencyInputPanelProps.currencyInfo,
        currency,
        balance,
        amount: null,
      },
    })

    fireEvent.click(screen.getByTestId('percent-25-button'))
    expect(onUserInput).toHaveBeenCalledWith(defaultCurrencyInputPanelProps.currencyInfo.field, '25')
  })

  it('calls onUserInput with 50% of maxBalance when 50% button is clicked', () => {
    const onUserInput = jest.fn()
    renderWithI18n({
      ...defaultCurrencyInputPanelProps,
      onUserInput,
      showSetMax: true,
      maxBalance,
      currencyInfo: {
        ...defaultCurrencyInputPanelProps.currencyInfo,
        currency,
        balance,
        amount: null,
      },
    })

    fireEvent.click(screen.getByTestId('percent-50-button'))
    expect(onUserInput).toHaveBeenCalledWith(defaultCurrencyInputPanelProps.currencyInfo.field, '50')
  })

  it('calls onUserInput with 75% of maxBalance when 75% button is clicked', () => {
    const onUserInput = jest.fn()
    renderWithI18n({
      ...defaultCurrencyInputPanelProps,
      onUserInput,
      showSetMax: true,
      maxBalance,
      currencyInfo: {
        ...defaultCurrencyInputPanelProps.currencyInfo,
        currency,
        balance,
        amount: null,
      },
    })

    fireEvent.click(screen.getByTestId('percent-75-button'))
    expect(onUserInput).toHaveBeenCalledWith(defaultCurrencyInputPanelProps.currencyInfo.field, '75')
  })

  it('calls onUserInput with 100% of maxBalance when Max button is clicked', () => {
    const onUserInput = jest.fn()
    renderWithI18n({
      ...defaultCurrencyInputPanelProps,
      onUserInput,
      showSetMax: true,
      maxBalance,
      currencyInfo: {
        ...defaultCurrencyInputPanelProps.currencyInfo,
        currency,
        balance,
        amount: null,
      },
    })

    fireEvent.click(screen.getByTestId('percent-100-button'))
    expect(onUserInput).toHaveBeenCalledWith(defaultCurrencyInputPanelProps.currencyInfo.field, '100')
  })

  it('sets aria-pressed and active state when amount matches percentage', () => {
    const amount50 = currency ? CurrencyAmount.fromRawAmount(currency, 50n * 10n ** 18n) : null
    renderWithI18n({
      ...defaultCurrencyInputPanelProps,
      showSetMax: true,
      maxBalance,
      currencyInfo: {
        ...defaultCurrencyInputPanelProps.currencyInfo,
        currency,
        balance,
        amount: amount50,
      },
    })

    expect(screen.getByTestId('percent-50-button').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByTestId('percent-25-button').getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByTestId('percent-75-button').getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByTestId('percent-100-button').getAttribute('aria-pressed')).toBe('false')
  })
})
