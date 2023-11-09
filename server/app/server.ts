import config from 'config'
import type { Application } from 'express'
import http from 'http'

const port: number = config.get<number>('port')

export default class {
  app: Application
  http: http.Server
  constructor (app: Application) {
    this.app = app
    this.http = http.createServer(this.app)
  }

  init (): void {
    this.http.listen(port, () => {
      console.log(`Connection successfull on port ${port}`)
    })
  }
}
