import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const WalletSchema: Schema = new Schema({
  address: {type: String, required: true},
  seedPhrase: {type: String, requred: true},
  password: {type: String, required: true},
  userId: {type: String, required: true},
  state: {type: String, required: true},
  coins: {type: Array, required: true}
})

export default mongoose.model<Wallet>('Wallet', WalletSchema)

export interface Wallet extends Document {
  address: string
  seedPhrase: string
  password: string
  userId: string
  state: string
  coins: Array<string>
}