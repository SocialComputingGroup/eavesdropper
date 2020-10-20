import mongoose = require('mongoose')
import {Schema, Document} from 'mongoose'

const PersonSchema: Schema = new Schema({
  name: {type: String, required: true},
  birthdate: {type: Date, requred: true},
  password: {type: String, required: true},
  realm: {type: String, required: true},
  email: {type: String, required: true}
})

export default mongoose.model<Person>('Person', PersonSchema)

export interface Person extends Document {
  name: string
  birthdate: Date
  password: string
  realm: string
  email: string
}