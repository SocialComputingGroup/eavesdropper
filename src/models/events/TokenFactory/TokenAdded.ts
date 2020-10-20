export interface TokenAdded {
  _from: string
  _timestamp: number
  _contractAddress: string
  _name: string
  _symbol: string
  _decimals: number
  _purpose: number
  _logoURL: string
  _hardCap: number
  mintable: boolean
}