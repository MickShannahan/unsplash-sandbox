import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { Paths, RegisterControllers } from '../Setup'
import { logger } from './utils/Logger'

export default class Startup {
  static ConfigureGlobalMiddleware(app) {
    // NOTE Configure and Register Middleware
    Startup.configureCors(app)
    app.use(helmet({
      contentSecurityPolicy: false
    }))
    app.use(json({ limit: '50mb' }))
  }

  static configureCors(app) {
    const allowedDomains = ['http://localhost:8080', 'http://localhost:8081', '.github.io']
    const corsOptions = {
      origin(origin, callback) {
        if (process.env.NODE_ENV === 'dev') {
          return callback(null, true)
        }
        if(!origin) return callback(null, true) // server to server
        const originIsWhitelisted = allowedDomains.findIndex(ad => origin.includes(ad)) !== -1
        callback(null, originIsWhitelisted)
      },
      credentials: true
    }

    app.use(cors(corsOptions))
  }

  static ConfigureRoutes(app) {
    const router = express.Router()
    RegisterControllers(router)
    app.use(router)

    app.use('', express.static(Paths.Public))
    Startup.registerErrorHandlers(app)
  }

  static registerErrorHandlers(app) {
    // NOTE SEND 404 for any unknown routes
    app.use(
      '*',
      (_, res, next) => {
        res.status(404)
        next()
      },
      express.static(Paths.Public + '404')
    )
    // NOTE Default Error Handler
    app.use((error, req, res, next) => {
      if (!error.status) {
        error.status = 400
      }
      if (error.status === 500) {
        logger.error(error)
      }
      res.status(error.status).send({ error: error.toString(), url: req.url })
    })
  }
}
