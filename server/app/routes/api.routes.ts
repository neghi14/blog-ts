import type { Application, NextFunction, Request, Response } from 'express'

export default class {
  app: Application
  constructor (app: Application) {
    this.app = app
  }

  serve (): void {
    this.app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200)
    })
    this.app.get('/err', (req: Request, res: Response, next: NextFunction) => {
      next(new Error())
    })
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(404)
    })

    this.app.use(
      (_err: Error, req: Request, res: Response, next: NextFunction): void => {
        res.sendStatus(500)
      }
    )
  }
}
