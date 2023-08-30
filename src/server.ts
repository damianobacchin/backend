import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import logger from './services/logger'
import { loadFrontofficeRoutes } from './frontoffice/routes'
import { loadBackofficeRoutes } from './backoffice/routes'
import keys from './config/env/keys'
import { ResponseError } from './interfaces/error.interface'
// Modifica

// Authentication
require('./auth/index')

// Cronjob
require('./services/cronjob')

// Express
const app = express()
app.use(express.json())


// MongoDB connection
mongoose.connect(keys.ATLAS_URI!)
const connection = mongoose.connection

connection.once('open', () => {
    logger.info('Connected to MongoDB')
})


// Express inizialization
app.listen(5000, () => {
    logger.info('Server started on port 5000')

    // Error middleware
    app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
        return res.status(err.status || 500).json(err.message || 'Internal server error')
    })
})

// Load routes
loadFrontofficeRoutes(app)
loadBackofficeRoutes(app)

app.get('/', (req: Request, res: Response) => res.json('Hello world'))
