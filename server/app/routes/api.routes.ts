import type { Application, NextFunction, Request, Response } from 'express'

export default class {
  app: Application
  constructor (app: Application) {
    this.app = app
  }

  serve (): void {
    this.app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
      res.send(200)
    })

    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      res.send(404)
    })
  }
}
