import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const CrowdsaleAddedSchema: Schema = new Schema({
  contractAddress: {type: String, required: true},
  identifier: {type: String, required: true},
  start: {type: Date, requred: true},
  end: {type: Date, required: true},
  acceptRatio: {type: Number, requred: true},
  giveRatio: {type: Number, requred: true},
  owner: {type: String, requred: true},
  timestamp: {type: Date, requred: true},
  maxCap: {type: Number, requred: true}
})

export default mongoose.model<CrowdsaleAdded>('CrowdsaleAdded', CrowdsaleAddedSchema)

export interface CrowdsaleAdded extends Document {
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