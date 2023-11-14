import type { Request, Response, NextFunction } from 'express'

export const cors = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'HEAD, OPTIONS, GET, POST, PATCH, DELETE '
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-Type, '
    )
    next()
  }
}
