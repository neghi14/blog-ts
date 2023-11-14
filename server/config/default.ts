import dotenv from 'dotenv'

dotenv.config()

export default {
  env: 'development',
  port: 8080,

  database: process.env.DATABASE_URL
}
