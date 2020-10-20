import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const RefundToSchema: Schema = new Schema({
  contractAddress: {type: String, required: true},
  identifier: {type: String, required: true},
  amount: {type: Number, requred: true},
  to: {type: String, requred: true},
  timestamp: {type: Date, requred: true},
  contractReferral: {type: Number, required: true}
})

export default mongoose.model<RefundTo>('RefundTo', RefundToSchema)

export interface RefundTo extends Document {
  contractAddress: string
  identifier: string
  amount: number
  to: string
  timestamp: Date
  contractReferral: number
}