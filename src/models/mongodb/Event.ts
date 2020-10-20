import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const EventSchema: Schema = new Schema({
  contractAddress: {type: String, required: true},
  contractType: {type: String, requred: true},
  name: {type: String, required: false},
  token_symbol: {type: String, required: false},
  logoURL: {type: String, required: false},
  purpose: {type: Number, required: false},
  owner: {type: String, required: false},
  decimals: {type: Number, required: false}
})

export default mongoose.model<Event>('Event', EventSchema)

export interface Event extends Document {
  contractAddress: string
  contractType: string
  name: string
  token_symbol: string
  logoURL: string
  purpose: number
  owner: string
  decimals: number
}