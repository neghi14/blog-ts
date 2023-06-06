import { injectable } from "tsyringe";
import UserLoginService from "../../../services/auth/common/login.user";
import { NextFunction, Request, Response } from "express";
import RegisterUserService from "../../../services/auth/user/register.user";

@injectable()
export default class AuthenticateUser {
  constructor(private userLogin: UserLoginService, private userRegister: RegisterUserService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    await this.userLogin.execute(req, res, next);
  }
  async register(req: Request, res: Response, next: NextFunction) {
    await this.userRegister.execute(req, res, next);
  }
}
