import pino, { type Logger } from 'pino'
import dayjs from 'dayjs'

export const logger: Logger = pino({
  transport: {
    target: 'pino-pretty'
  },
  base: {
    pid: false
  },
  timestamps: () => `, Time: "${dayjs().format()}"`
})
