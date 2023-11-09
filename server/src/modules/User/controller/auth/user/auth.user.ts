import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import UserLoginService from "../../../services/auth/common/login.account.service";
import RegisterUserService from "../../../services/auth/user/register.account.service";
import DeleteMeService from "../../../services/auth/user/delete.account.service";
import ChangePasswordService from "../../../services/auth/user/change.password.service";
import VerifyUserService from "../../../services/auth/user/verify.account.service";
import ForgotPasswordService from "../../../services/auth/user/forgot.password.service";
import RefreshVerifyTokenService from "../../../services/auth/user/refresh.verify.service";
import RefreshResetTokenService from "../../../services/auth/user/refresh.reset.service";

@injectable()
export default class AuthenticateUser {
  constructor(
    private userLogin: UserLoginService,
    private userRegister: RegisterUserService,
    private userDelete: DeleteMeService,
    private userPassword: ChangePasswordService,
    private userVerify: VerifyUserService,
    private userReset: ForgotPasswordService,
    private verifyRefresh: RefreshVerifyTokenService,
    private resetRefresh: RefreshResetTokenService
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    await this.userLogin.execute(req, res, next);
  }
  async register(req: Request, res: Response, next: NextFunction) {
    await this.userRegister.execute(req, res, next);
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    await this.userDelete.execute(req, res, next);
  }
  async changePassword(req: Request, res: Response, next: NextFunction) {
    await this.userPassword.execute(req, res, next);
  }
  async verifyUser(req: Request, res: Response, next: NextFunction) {
    await this.userVerify.execute(req, res, next);
  }
  async forgotUser(req: Request, res: Response, next: NextFunction) {
    await this.userReset.execute(req, res, next);
  }
  async refreshVerify(req: Request, res: Response, next: NextFunction) {
    await this.verifyRefresh.execute(req, res, next);
  }
  async refreshReset(req: Request, res: Response, next: NextFunction) {
    await this.resetRefresh.execute(req, res, next);
  }
}
