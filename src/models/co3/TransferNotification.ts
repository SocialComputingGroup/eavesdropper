export interface TransferNotification {
  sender_pk: string
  recipient_pk: string
  amount: number
  token_symbol: string
  executed_on: number
}