/* eslint-disable @typescript-eslint/no-misused-promises */
import { container } from 'tsyringe'

import UserController from '../controllers/userController'
import { type NextFunction, type Request, type Response, Router } from 'express'
import { validator } from '../../../app/middleware'
import { createUser, getUser, getUsers } from '../validation/userValidation'

const user = container.resolve(UserController)

const userRouter: Router = Router()

userRouter
  .get(
    '/',
    validator(getUsers),
    async (req: Request, res: Response, next: NextFunction) => {
      await user.readAllUsers(req, res, next)
    }
  )
  .get(
    '/:id',
    validator(getUser),
    async (req: Request, res: Response, next: NextFunction) => {
      await user.readOneUser(req, res, next)
    }
  )
  .post(
    '/',
    validator(createUser),
    async (req: Request, res: Response, next: NextFunction) => {
      await user.createUser(req, res, next)
    }
  )
  .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await user.createUser(req, res, next)
  })

export default userRouter
