import { createPool } from 'mysql2/promise'
import config from 'config'

const connection = createPool(config.get('database'))

export { connection }
