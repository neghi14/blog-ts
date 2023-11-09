import 'reflect-metadata'
import express from 'express'
import Server from './app/server'
import ApiRoutes from './app/routes/api.routes'

const app: express.Application = express()

new Server(app).init()
new ApiRoutes(app).serve()
export { app }
