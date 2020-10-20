import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const ContributionFromSchema: Schema = new Schema({
  contractAddress: {type: String, required: true},
  identifier: {type: String, required: true},
  amount: {type: Number, requred: true},
  from: {type: String, requred: true},
  timestamp: {type: Date, requred: true}
})

export default mongoose.model<ContributionFrom>('ContributionFrom', ContributionFromSchema)

export interface ContributionFrom extends Document {
  contractAddress: string
  identifier: string
  amount: number
  from: string
  timestamp: Date
}