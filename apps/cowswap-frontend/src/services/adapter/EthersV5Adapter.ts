import {
  Abi,
  AbstractProviderAdapter,
  AbstractSigner,
  AdapterTypes,
  AdapterUtils,
  Address,
  BigIntish,
  Bytes,
  ContractValue,
  CowError,
  GenericContract,
  GenericContractInterface,
  Hex,
  ParamType,
  PrivateKey,
  TransactionParams,
  TransactionReceipt,
  TransactionResponse,
  TypedDataDomain,
  TypedDataTypes,
} from '@cowprotocol/sdk-common'
import { BigNumber, BytesLike, ethers, Signer } from 'ethers'
import { _TypedDataEncoder } from 'ethers/lib/utils'

export class EthersV5Utils implements AdapterUtils {
  toUtf8Bytes(text: string): Uint8Array {
    return ethers.utils.toUtf8Bytes(text)
  }

  createInterface(abi: any): GenericContractInterface {
    return new ethers.utils.Interface(abi) as any
  }

  getCreate2Address(from: string, salt: BytesLike, initCodeHash: BytesLike): string {
    return ethers.utils.getCreate2Address(from, salt, initCodeHash)
  }

  hexConcat(items: ReadonlyArray<BytesLike>): string {
    return ethers.utils.hexConcat(items)
  }

  formatBytes32String(text: string): string {
    return ethers.utils.formatBytes32String(text)
  }

  encodeDeploy(encodeDeployArgs: any, abi: any): string {
    const contractInterface = new ethers.utils.Interface(abi)
    return contractInterface.encodeDeploy(encodeDeployArgs)
  }

  keccak256(data: BytesLike): Hex {
    return ethers.utils.keccak256(data) as Hex
  }

  sha256(data: BytesLike): Hex {
    return ethers.utils.sha256(data) as Hex
  }

  hexZeroPad(value: BytesLike, length: number): string {
    return ethers.utils.hexZeroPad(value, length)
  }

  arrayify(hexString: string): Uint8Array {
    return ethers.utils.arrayify(hexString)
  }

  hexlify(value: BytesLike): string {
    return ethers.utils.hexlify(value)
  }

  solidityPack(types: string[], values: any[]): string {
    return ethers.utils.solidityPack(types, values)
  }

  hashTypedData(domain: TypedDataDomain, types: TypedDataTypes, data: Record<string, unknown>): string {
    return ethers.utils._TypedDataEncoder.hash(domain as any, types as any, data)
  }

  getChecksumAddress(address: string): Hex {
    return ethers.utils.getAddress(address) as Hex
  }

  async recoverAddress(hash: Hex, signature: Hex): Promise<Hex> {
    return ethers.utils.recoverAddress(hash, signature) as Hex
  }

  encodeAbi(types: string[], values: any[]): BytesLike {
    return ethers.utils.defaultAbiCoder.encode(types, values)
  }

  decodeAbi(types: string[], data: BytesLike): any[] {
    const decoded = ethers.utils.defaultAbiCoder.decode(types, data)
    return decoded.map((x) => this.convertBigNumbersToBigInt(x))
  }

  private convertBigNumbersToBigInt(value: any): any {
    if (ethers.BigNumber.isBigNumber(value)) {
      return value.toBigInt()
    }
    if (value && typeof value === 'object' && typeof value.length === 'number') {
      const result: any = []
      for (let i = 0; i < value.length; i++) {
        result[i] = this.convertBigNumbersToBigInt(value[i])
      }
      for (const [key, val] of Object.entries(value)) {
        if (isNaN(Number(key)) && key !== 'length') {
          result[key] = this.convertBigNumbersToBigInt(val)
        }
      }
      return result
    }
    if (value && typeof value === 'object') {
      const result: any = {}
      for (const [key, val] of Object.entries(value)) {
        result[key] = this.convertBigNumbersToBigInt(val)
      }
      return result
    }
    if (Array.isArray(value)) {
      return value.map((item) => this.convertBigNumbersToBigInt(item))
    }
    return value
  }

  id(text: string): BytesLike {
    return ethers.utils.id(text)
  }

  toBigIntish(value: any): BigIntish {
    return ethers.BigNumber.from(value).toBigInt()
  }

  hexDataSlice(data: BytesLike, offset: number, endOffset?: number): BytesLike {
    return ethers.utils.hexDataSlice(data, offset, endOffset)
  }

  joinSignature(signature: { r: string; s: string; v: number }): string {
    return ethers.utils.joinSignature(signature)
  }

  splitSignature(signature: BytesLike): { r: string; s: string; v: number } {
    const split = ethers.utils.splitSignature(signature)
    return {
      r: split.r,
      s: split.s,
      v: split.v,
    }
  }

  verifyMessage(message: string | Uint8Array, signature: BytesLike): string {
    return ethers.utils.verifyMessage(message, signature)
  }

  verifyTypedData(domain: TypedDataDomain, types: any, value: Record<string, unknown>, signature: BytesLike): string {
    return ethers.utils.verifyTypedData(domain as any, types, value, signature)
  }

  encodeFunction(abi: any, functionName: string, args: any[]): string {
    const iface = new ethers.utils.Interface(abi)
    return iface.encodeFunctionData(functionName, args)
  }

  decodeFunctionData(abi: any, functionName: string, data: string): any {
    const iface = new ethers.utils.Interface(abi)
    const result = iface.decodeFunctionData(functionName, data)
    const args: any = Array.from(result)
    const functionAbi = iface.getFunction(functionName)
    if (functionAbi && functionAbi.inputs) {
      functionAbi.inputs.forEach((input: any, index: number) => {
        if (input.name && args[index] !== undefined) {
          args[input.name] = args[index]
        }
      })
    }
    return args
  }

  toNumber(value: BigIntish): number {
    return ethers.BigNumber.from(value).toNumber()
  }

  solidityKeccak256(types: string[], values: any[]): string {
    return ethers.utils.solidityKeccak256(types, values)
  }

  hashDomain(domain: TypedDataDomain): string {
    return ethers.utils._TypedDataEncoder.hashDomain(domain as any)
  }

  async grantRequiredRoles(
    authorizerAddress: string,
    authorizerAbi: Abi,
    vaultAddress: string,
    vaultRelayerAddress: string,
    contractCall: (address: string, abi: Abi, functionName: string, args: any[]) => Promise<void>,
  ): Promise<void> {
    const vaultAbi = [
      'function manageUserBalance((uint8, address, uint256, address, address)[])',
      'function batchSwap(uint8, (bytes32, uint256, uint256, uint256, bytes)[], address[], (address, bool, address, bool), int256[], uint256)',
    ]
    const vaultInterface = new ethers.utils.Interface(vaultAbi)
    for (const name in vaultInterface.functions) {
      const functionSelector = vaultInterface.getSighash(name)
      const roleHash = ethers.utils.solidityKeccak256(['uint256', 'bytes4'], [vaultAddress, functionSelector])
      await contractCall(authorizerAddress, authorizerAbi, 'grantRole', [roleHash, vaultRelayerAddress])
    }
  }

  async readStorage(
    baseAddress: Address,
    baseAbi: Abi,
    readerAddress: Address,
    readerAbi: Abi,
    provider: any,
    method: string,
    parameters: any[],
  ): Promise<any> {
    const base = new ethers.Contract(baseAddress, baseAbi as any, provider)
    const reader = new ethers.Contract(readerAddress, readerAbi as any, provider)
    const encodedCall = reader.interface.encodeFunctionData(method, parameters)
    if (!base.callStatic.simulateDelegatecall) {
      throw new Error('simulateDelegatecall method not found on base contract')
    }
    const resultBytes = await base.callStatic.simulateDelegatecall(reader.address, encodedCall)
    return reader.interface.decodeFunctionResult(method, resultBytes)[0]
  }

  randomBytes(length: number): string {
    return ethers.utils.hexlify(ethers.utils.randomBytes(length))
  }

  isAddress(address: string): boolean {
    return ethers.utils.isAddress(address)
  }

  isHexString(value: string): boolean {
    return ethers.utils.isHexString(value)
  }

  hexDataLength(data: string): number {
    return ethers.utils.hexDataLength(data)
  }

  parseUnits(value: string, decimals: number): bigint {
    return ethers.utils.parseUnits(value, decimals).toBigInt()
  }

  getParamType(type: string): ParamType {
    return ethers.utils.ParamType.from(type) as any
  }

  getParamTypeFromString(type: string): ParamType {
    return ethers.utils.ParamType.fromString(type) as any
  }

  isInterface(value: any): boolean {
    return ethers.utils.Interface.isInterface(value)
  }
}

export class EthersV5SignerAdapter extends AbstractSigner<ethers.providers.Provider> {
  protected _signer: Signer & { _signTypedData?: any }

  constructor(signer: Signer & { _signTypedData?: any }) {
    super()
    this._signer = signer
  }

  connect(provider: ethers.providers.Provider): void {
    if (this._signer.provider) return
    ;(this._signer as any).connect?.(provider)
  }

  async getAddress(): Promise<string> {
    return await this._signer.getAddress()
  }

  async signMessage(message: string | Uint8Array): Promise<string> {
    return await this._signer.signMessage(message)
  }

  async signTransaction(txParams: TransactionParams): Promise<string> {
    if ('_signTransaction' in this._signer) {
      return await (this._signer as any)._signTransaction(this._formatTxParams(txParams))
    }
    throw new CowError('signTransaction not supported by this ethers v5 signer')
  }

  async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, any[]>,
    value: Record<string, unknown>,
  ): Promise<string> {
    if (this._signer._signTypedData) {
      return await this._signer._signTypedData(domain as any, types as any, value)
    }
    // Fallback if _signTypedData is not directly on signer
    const provider = this._signer.provider as any
    if (provider && provider.send) {
      const populated = await _TypedDataEncoder.resolveNames(
        domain as any,
        types as any,
        value,
        (name) => this.resolveName(name),
      )
      const payload = _TypedDataEncoder.getPayload(populated.domain, types as any, populated.value)
      const address = await this.getAddress()
      return await provider.send('eth_signTypedData_v4', [address.toLowerCase(), JSON.stringify(payload)])
    }
    throw new CowError('Signer does not support signTypedData')
  }

  private async resolveName(name: string): Promise<string> {
    if ((this._signer as any).resolveName) {
      return await (this._signer as any).resolveName(name)
    }
    return name
  }

  async sendTransaction(txParams: TransactionParams): Promise<TransactionResponse> {
    const tx = await this._signer.sendTransaction(this._formatTxParams(txParams))
    return {
      hash: tx.hash,
      wait: async (confirmations?: number) => {
        const receipt = await tx.wait(confirmations)
        return {
          from: receipt.from,
          to: receipt.to,
          transactionHash: receipt.transactionHash,
          blockNumber: BigInt(receipt.blockNumber),
          blockHash: receipt.blockHash,
          status: receipt.status,
          gasUsed: BigInt(receipt.gasUsed.toString()),
          logs: receipt.logs.map((log) => ({ ...log, blockNumber: BigInt(log.blockNumber) })),
        } as TransactionReceipt
      },
    } as TransactionResponse
  }

  private _formatTxParams(txParams: TransactionParams): any {
    const formatted: any = { ...txParams }
    if (typeof formatted.value === 'bigint') {
      formatted.value = BigNumber.from(formatted.value.toString())
    }
    if (typeof formatted.gasLimit === 'bigint') {
      formatted.gasLimit = BigNumber.from(formatted.gasLimit.toString())
    }
    if (typeof formatted.gasPrice === 'bigint') {
      formatted.gasPrice = BigNumber.from(formatted.gasPrice.toString())
    }
    if (typeof formatted.maxFeePerGas === 'bigint') {
      formatted.maxFeePerGas = BigNumber.from(formatted.maxFeePerGas.toString())
    }
    if (typeof formatted.maxPriorityFeePerGas === 'bigint') {
      formatted.maxPriorityFeePerGas = BigNumber.from(formatted.maxPriorityFeePerGas.toString())
    }
    return formatted
  }

  async estimateGas(txParams: TransactionParams): Promise<bigint> {
    if (!this._signer.provider) {
      throw new CowError('Signer must have a provider to estimate gas')
    }
    const formattedParams = this._formatTxParams(txParams)
    const estimate = await this._signer.provider.estimateGas(formattedParams)
    return BigInt(estimate.toString())
  }
}

export interface EthersV5AdapterOptions {
  provider: ethers.providers.Provider | string
  signer?: Signer | PrivateKey
}

export interface EthersV5Types extends AdapterTypes {
  Abi: any
  Bytes: BytesLike
  ContractInterface: ethers.utils.Interface
  Provider: ethers.providers.Provider
  Signer: Signer
}

export class EthersV5Adapter extends AbstractProviderAdapter<EthersV5Types> {
  private _provider: ethers.providers.Provider
  private _signerAdapter?: EthersV5SignerAdapter
  public utils: EthersV5Utils

  constructor(options: EthersV5AdapterOptions) {
    super()
    this.ZERO_ADDRESS = ethers.constants.AddressZero
    this._provider = this.setProvider(
      typeof options.provider === 'string' ? new ethers.providers.JsonRpcProvider(options.provider) : options.provider,
    )
    if (options.signer) {
      this._signerAdapter = this.createSigner(options.signer as any)
    }
    this.utils = new EthersV5Utils()
  }

  get signer(): EthersV5SignerAdapter {
    if (!this._signerAdapter) {
      throw new CowError('No signer provided, use setSigner to create a signer')
    }
    return this._signerAdapter
  }

  signerOrNull(): EthersV5SignerAdapter | null {
    return this._signerAdapter || null
  }

  setSigner(signer: Signer | PrivateKey): void {
    this._signerAdapter = this.createSigner(signer as any)
  }

  setProvider(provider: ethers.providers.Provider): ethers.providers.Provider {
    this._provider = provider
    this.signerOrNull()?.connect(this._provider)
    return this._provider
  }

  createSigner(signerOrPrivateKey: Signer | PrivateKey | EthersV5SignerAdapter): EthersV5SignerAdapter {
    if (signerOrPrivateKey instanceof EthersV5SignerAdapter) {
      signerOrPrivateKey.connect(this._provider)
      return signerOrPrivateKey
    }
    if (typeof signerOrPrivateKey === 'string') {
      const wallet = new ethers.Wallet(signerOrPrivateKey, this._provider)
      return new EthersV5SignerAdapter(wallet.connect(this._provider))
    }
    return new EthersV5SignerAdapter(
      (signerOrPrivateKey as any).provider ? signerOrPrivateKey : (signerOrPrivateKey as any).connect?.(this._provider) || signerOrPrivateKey,
    )
  }

  async getChainId(): Promise<number> {
    return (await this._provider.getNetwork()).chainId
  }

  async getCode(address: string): Promise<string> {
    return this._provider.getCode(address)
  }

  async getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt> {
    const receipt = await this._provider.getTransactionReceipt(transactionHash)
    return {
      ...receipt,
      gasUsed: receipt.gasUsed.toBigInt(),
      blockNumber: BigInt(receipt.blockNumber),
      logs: receipt.logs.map((log) => ({ ...log, blockNumber: BigInt(log.blockNumber) })),
    } as any
  }

  async getStorageAt(address: string, slot: any): Promise<BytesLike> {
    return this._provider.getStorageAt(address, slot)
  }

  async call(txParams: TransactionParams, provider?: ethers.providers.Provider): Promise<string> {
    const providerToUse = provider || this._provider
    return providerToUse.call({
      to: txParams.to,
      from: txParams.from,
      data: txParams.data,
    })
  }

  async readContract(
    params: { address: string; abi: Abi; functionName: string; args?: ContractValue[] },
    provider?: ethers.providers.Provider,
  ): Promise<unknown> {
    const { address, abi, functionName, args = [] } = params
    const providerToUse = provider || this._provider
    const contract = new ethers.Contract(address, abi as any, providerToUse)
    if (!contract.callStatic?.[functionName]) {
      throw new CowError(`Error reading contract ${address}: function ${functionName} was not found in Abi`)
    }
    return contract.callStatic[functionName](...args)
  }

  async getBlock(blockTag: string, provider?: ethers.providers.JsonRpcProvider): Promise<any> {
    const providerToUse = provider || this._provider
    return await providerToUse.getBlock(blockTag)
  }

  getContract(address: string, abi: Abi): GenericContract {
    return new ethers.Contract(address, abi as any, this._provider) as any
  }
}
