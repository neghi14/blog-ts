import 'reflect-metadata'
import express from 'express'
import Server from './app/server'

const app: express.Application = express()
app.use(express.json())

new Server(app).init()

export { app }
