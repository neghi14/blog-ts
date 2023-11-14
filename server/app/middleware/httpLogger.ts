import type { Request, Response, NextFunction } from 'express'

export const httpLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next()
}
