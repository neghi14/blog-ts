import 'reflect-metadata'
import express from 'express'
import Server from './app/server'
import { logger } from './app/libs/utils'
import config from 'config'
import mysql from 'mysql2'

const app: express.Application = express()

new Server(app).init()

const connection = mysql.createConnection(config.get('database'))
connection.connect(() => {
  logger.info('Database Connected')
})

export { app, connection }
