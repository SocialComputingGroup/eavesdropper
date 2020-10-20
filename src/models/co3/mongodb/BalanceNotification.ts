import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const BalanceNotificationSchema: Schema = new Schema({
  account_pk: {type: String, required: true},
  token_symbol: {type: String, requred: true},
  logoURL: {type: String, requred: true},
  name: {type: String, required: true},
  amount: {type: Number, requred: true},
  computed_at: {type: Date, requred: true},
  purpose: {type: Number, requred: true},
  contractAddress: {type: String, required: true},
  owner: {type: String, required: true},
  decimals: {type: Number, requred: true}
})

export default mongoose.model<BalanceNotification>('BalanceNotification', BalanceNotificationSchema)

export interface BalanceNotification extends Document {
  account_pk: string
  token_symbol: string
  logoURL: string
  name: string
  amount: number
  computed_at: Date
  purpose: number
  contractAddress: string
  owner: string
  decimals: number
}