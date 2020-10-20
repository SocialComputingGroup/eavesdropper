export interface CrowdsaleAddedNotification {
  contractAddress: string
  identifier: string
  start: Date
  end: Date
  acceptRatio: number
  giveRatio: number
  owner: string
  timestamp: Date
  maxCap: number
}