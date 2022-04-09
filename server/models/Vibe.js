import { Schema } from 'mongoose'

export const VibeSchema = new Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  musicSource: { type: String, required: true },
  plays: { type: Number, default: 0 }
}, { toJSON: { virtuals: true }, timestamps: true })
