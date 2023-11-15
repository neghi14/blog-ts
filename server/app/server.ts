import config from 'config'
import { type Application } from 'express'
import http from 'http'
import { logger } from './libs/utils/index'
import ApiRoutes from './routes/api.routes'

const port: number = config.get<number>('port')

export default class {
  app: Application
  http: http.Server
  api: ApiRoutes
  constructor (app: Application) {
    this.app = app
    this.http = http.createServer(this.app)
    this.api = new ApiRoutes(this.app)
  }

  init (): void {
    this.http.listen(port, () => {
      this.api.serve()
      logger.info('Server Online')
    })
  }
}
