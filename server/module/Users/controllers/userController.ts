/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { injectable } from 'tsyringe'
import GetUserUsecase from '../usecase/userUsecase'
import type { NextFunction, Request, Response } from 'express'
import { http as Http, HttpStatus } from '../../../app/libs/helpers'
import { encrypt } from '../../../app/libs/utils'

@injectable()
export default class UserController {
  constructor(
    readonly getUser: GetUserUsecase,
    readonly http: Http<any>
  ) {}

  async readOneUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const rows = await this.getUser.getOne({ id: req.params.id })

      this.http.res({
        res,
        status: HttpStatus.SUCCESS,
        statusCode: 200,
        message: 'success',
        data: {
          title: `Successfully Retrieved User with ID: ${rows[0].id}`,
          limit: '1',
          page: '1',
          length: '1',
          doc: rows
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async readAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const limit = req.query.limit as string || '10'
      const offset = req.query.page as string || '1'
      const sort = req.query.sort as string || 'id'
      const order = req.query.order as string || 'asc'
      const rows = await this.getUser.getAll(limit, offset, sort, order)
      const count = await this.getUser.count()

      this.http.res({
        res,
        status: HttpStatus.SUCCESS,
        statusCode: 200,
        message: 'success',
        data: {
          title: 'Successfully Retrieved Users',
          limit,
          page: offset,
          length: count[0].count,
          doc: rows
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const rows = await this.getUser.createUser({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: await encrypt(req.body.password)
      })
      const user = await this.getUser.getOne({ id: rows.insertId })
      this.http.res({
        res,
        status: HttpStatus.SUCCESS,
        statusCode: 200,
        message: 'success',
        data: {
          title: 'Successfully created User!',
          limit: '1',
          page: '1',
          length: '1',
          doc: user
        }
      })
    } catch (error: any) {
      next(error)
    }
  }
  // async updateDetails(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {

  // }
}
