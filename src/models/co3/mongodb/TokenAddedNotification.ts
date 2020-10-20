import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const TokenAddedSchema: Schema = new Schema({
  contractAddress: {type: String, required: true},
  name: {type: String, required: true},
  symbol: {type: String, requred: true},
  decimals: {type: Number, required: true},
  logoURL: {type: String, requred: true},
  owner: {type: String, requred: true},
  hardCap: {type: Number, requred: true},
  timestamp: {type: Date, requred: true},
  mintable: {type: Boolean, requred: true},
  purpose: {type: Number, requred: true}
})

export default mongoose.model<TokenAdded>('TokenAdded', TokenAddedSchema)

export interface TokenAdded extends Document {
  contractAddress: string
  name: string
  symbol: string
  decimals: number
  logoURL: string
  owner: string
  hardCap: number
  timestamp: Date
  mintable: boolean
  modifier: number
  purpose: number
}