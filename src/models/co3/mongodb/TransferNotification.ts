import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const TransferNotificationSchema: Schema = new Schema({
  sender_pk: {type: String, required: true},
  receiver_pk: {type: String, required: true},
  token_symbol: {type: String, requred: true},
  amount: {type: Number, requred: true},
  executed_on: {type: Date, requred: true},
  purpose: {type: Number, requred: true},
  contractAddress: {type: String, required: true},
  owner: {type: String, required: true},
  decimals: {type: Number, requred: true}
})

export default mongoose.model<TransferNotification>('TransferNotification', TransferNotificationSchema)

export interface TransferNotification extends Document {
  sender_pk: string
  receiver_pk: string
  token_symbol: string
  amount: number
  executed_on: Date
  purpose: number
  contractAddress: string
  owner: string
  decimals: number
}