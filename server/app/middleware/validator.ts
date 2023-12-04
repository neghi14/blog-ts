import type { NextFunction, Request, Response } from 'express'
import type { AnyZodObject } from 'zod'

export const validator = (body: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await body.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query
      })
      req.body = data.body
      req.query = data.query
      req.params = data.params
      next()
    } catch (error) {
      next(error)
    }
  }
}
