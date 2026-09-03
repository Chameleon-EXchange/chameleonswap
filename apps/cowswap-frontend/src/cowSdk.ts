import { MetadataApi } from '@cowprotocol/app-data'
import { isBarnBackendEnv } from '@cowprotocol/common-utils'
import { OrderBookApi } from '@cowprotocol/cow-sdk'
import { AdapterContext, setGlobalAdapter } from '@cowprotocol/sdk-common'
import { ethers } from 'ethers'

import { EthersV5Adapter } from './services/adapter/EthersV5Adapter'

const prodBaseUrls = process.env.REACT_APP_ORDER_BOOK_URLS
  ? JSON.parse(process.env.REACT_APP_ORDER_BOOK_URLS)
  : undefined

export const metadataApiSDK = new MetadataApi()
export const orderBookApi = new OrderBookApi({
  env: isBarnBackendEnv ? 'staging' : 'prod',
  ...(prodBaseUrls ? { baseUrls: prodBaseUrls } : undefined),
})

// Initialize and configure global provider adapter for CoW SDK
const defaultProvider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com')
export const globalAdapter = new EthersV5Adapter({ provider: defaultProvider })
setGlobalAdapter(globalAdapter)
AdapterContext.getInstance().setAdapter(globalAdapter)

