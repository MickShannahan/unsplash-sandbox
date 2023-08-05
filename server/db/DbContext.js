import mongoose from 'mongoose'
import { VibeSchema } from '../models/Vibe'
import { JSONschema } from '../models/json.js'

class DbContext {
  Vibes = mongoose.model('Vibe', VibeSchema)

  JSON = mongoose.model('JSON', JSONschema)
}

export const dbContext = new DbContext()
