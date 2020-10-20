export interface CrowdsaleAdded {
  _id: string
  _from: string
  _timestamp: number
  _contractAddress: string
  _start: number
  _end: number
  _acceptRatio: number
  _giveRatio: number
  _maxCap: number
  owner: string
}