import type { NextFunction, Request, Response } from 'express'
import { logger } from '../libs/utils/logger'
import { white, green, red } from 'picocolors'

export const httpLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start: number = Date.now()
  logger.info(
    white(
      `REQ >>> ${req.method.toUpperCase()} ${req.socket.remoteAddress} ${
        req.url
      }`
    )
  )
  res.on('finish', () => {
    if (
      res.statusCode.toString().startsWith('2') ||
      res.statusCode.toString().startsWith('3')
    ) {
      logger.info(
        green(
          `RES >>> ${req.method.toUpperCase()} ${req.socket.remoteAddress} ${
            req.url
          } ${res.statusCode} ${res.statusMessage} ${res.get(
            'content-length'
          )} ${Date.now() - start}ms`
        )
      )
    }
    if (
      res.statusCode.toString().startsWith('4') ||
      res.statusCode.toString().startsWith('5')
    ) {
      logger.error(
        red(
          `RES >>> ${req.method.toUpperCase()} ${req.socket.remoteAddress} ${
            req.url
          } ${res.statusCode} ${res.statusMessage} ${res.get(
            'content-length'
          )} ${Date.now() - start}ms`
        )
      )
    }
  })
  next()
}
