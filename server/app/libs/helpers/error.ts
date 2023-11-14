import { HttpStatus } from './'

export default class _Error extends Error {
  statusCode: number
  status: HttpStatus
  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${this.statusCode}`.startsWith('4')
      ? HttpStatus.FAILED
      : HttpStatus.ERROR
    Error.captureStackTrace(this, this.constructor)
  }
}
