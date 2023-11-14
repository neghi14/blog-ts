import 'reflect-metadata'
import express from 'express'
import Server from './app/server'
import mysql from 'mysql2'
import config from 'config'

const app: express.Application = express()

// if (config.get('env') === 'development') {
//   app.use(morgan('tiny'))
// }

new Server(app).init()

// const connection = mysql.createConnection(config.get('database'))
// connection.connect(() => {
//   console.log('connected')
// })

export { app }
