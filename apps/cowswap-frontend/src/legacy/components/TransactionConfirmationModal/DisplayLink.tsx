import { CHAIN_INFO } from '@cowprotocol/common-const'
import { getBlockExplorerUrl, getEtherscanLink } from '@cowprotocol/common-utils'
import { Command } from '@cowprotocol/types'

import { OrderStatus } from 'legacy/state/orders/actions'
import { useOrder } from 'legacy/state/orders/hooks'

import { ExternalLinkCustom } from './styled'

type DisplayLinkProps = {
  id: string | undefined
  chainId: number
  onClick?: Command
}

export function DisplayLink({ id, chainId, onClick }: DisplayLinkProps) {
  const order = useOrder({ id, chainId })
  const { orderCreationHash, status, owner } = order || {}

  if (!id || !chainId) {
    return null
  }

  const txHash =
    (orderCreationHash && (status === OrderStatus.CREATING || status === OrderStatus.FAILED)
      ? orderCreationHash
      : undefined) ||
    (order as any)?.txHash ||
    (order as any)?.executionTxHash ||
    (id.length === 66 ? id : undefined)

  const href = txHash
    ? getBlockExplorerUrl(chainId, 'transaction', txHash)
    : owner
    ? getBlockExplorerUrl(chainId, 'address', owner)
    : getEtherscanLink(chainId, 'transaction', id)

  const explorerTitle = (CHAIN_INFO as any)[chainId]?.explorerTitle || 'Explorer'
  const label = `View on ${explorerTitle}`

  return <ExternalLinkCustom href={href} onClick={onClick}>{label} ↗</ExternalLinkCustom>
}
