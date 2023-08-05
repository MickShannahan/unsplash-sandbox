import { Schema } from 'mongoose'

export const JSONschema = new Schema({
  json: { type: String, required: true },
  cluster: { type: String, required: true }
}, { timestamps: true, toObject: { virtuals: true } })
