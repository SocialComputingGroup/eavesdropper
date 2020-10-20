export interface RefundToNotification {
  contractAddress: string
  identifier: string
  amount: number
  to: string
  timestamp: Date
  contractReferral: number
}