import type { Application, NextFunction, Request, Response } from 'express'
import _Error from '../libs/helpers/error'
import { http as Http, HttpStatus } from '../libs/helpers'

export default class {
  app: Application
  res: Http<any>
  constructor (app: Application) {
    this.app = app
    this.res = new Http<any>()
  }

  serve (): void {
    this.app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200)
    })
    this.app.get('/err', (req: Request, res: Response, next: NextFunction) => {
      next(new _Error('err', 500))
    })
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(404)
    })

    this.app.use(
      (_err: _Error, req: Request, res: Response, next: NextFunction): void => {
        this.res.res({
          res,
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          statusCode: _err.statusCode || 500,
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          status: _err.status || HttpStatus.ERROR,
          message: _err.message
        })
      }
    )
  }
}
