import dotenv from 'dotenv'

dotenv.config()

export default {
  port: 8080,

  database: process.env.DATABASE_URL
}
