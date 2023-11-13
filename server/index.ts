import 'reflect-metadata'
import express from 'express'
import Server from './app/server'
import ApiRoutes from './app/routes/api.routes'
import mysql from 'mysql2'
import config from 'config'

const app: express.Application = express()

new Server(app).init()
new ApiRoutes(app).serve()
const connection = mysql.createConnection(config.get('database'))
connection.connect(() => {
  console.log('connected')
})

connection.query('SELECT * FROM users', (err) => {
  if (err !== null) console.log(err)
})

export { app }
