import { CHAIN_INFO } from '@cowprotocol/common-const'
import { SupportedChainId as ChainId, UID } from '@cowprotocol/cow-sdk'

export function getExplorerBaseUrl(chainId: ChainId): string {
  const chainInfo = (CHAIN_INFO as any)[chainId]
  return chainInfo?.explorer || 'https://etherscan.io'
}

export function getExplorerOrderLink(chainId: ChainId, orderId: UID): string {
  const baseUrl = getExplorerBaseUrl(chainId)

  if (orderId && orderId.length === 66) {
    return `${baseUrl}/tx/${orderId}`
  }
  return baseUrl
}

export function getExplorerAddressLink(chainId: ChainId, address: string): string {
  const baseUrl = getExplorerBaseUrl(chainId)

  return `${baseUrl}/address/${address}`
}

enum Explorers {
  Explorer = 'Explorer',
  Blockscout = 'Blockscout',
  Etherscan = 'Etherscan',
  Arbiscan = 'Arbiscan',
  GnosisScan = 'GnosisScan',
}

// Used for GA ExternalLink detection
export function detectExplorer(href: string) {
  if (href.includes('explorer.cow.fi')) {
    return Explorers.Explorer
  } else if (href.includes('blockscout.com')) {
    return Explorers.Blockscout
  } else if (href.includes('etherscan.io')) {
    return Explorers.Etherscan
  } else if (href.includes('arbiscan.io')) {
    return Explorers.Arbiscan
  } else if (href.includes('gnosisscan.io')) {
    return Explorers.GnosisScan
  } else {
    return undefined
  }
}
