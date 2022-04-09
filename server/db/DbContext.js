import mongoose from 'mongoose'
import { VibeSchema } from '../models/Vibe'

class DbContext {
  Vibes = mongoose.model('Vibe', VibeSchema)
}

export const dbContext = new DbContext()
