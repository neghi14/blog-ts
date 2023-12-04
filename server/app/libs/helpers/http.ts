import type { Response } from 'express'
import { injectable } from 'tsyringe'

@injectable()
export default class <T> {
  res ({ res, statusCode, status, message, data }: HttpResponse<T>): any {
    res.status(statusCode).json({
      status,
      message,
      data
    })
  }
}

interface HttpResponse<T> {
  res: Response
  statusCode: number
  status: HttpStatus
  message?: string
  data?: ReturnData<T>
}

interface ReturnData<T> {
  title: string
  length: string
  page: string
  limit: string
  doc: T
}

export enum HttpStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  ERROR = 'error'
}
