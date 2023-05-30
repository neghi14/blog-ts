import { injectable } from "tsyringe";
import { Request, Response } from "express";
import CustomerLoginService from "../services/customer/login.customer";

@injectable()
export default class UserAuthController {
  constructor(private login: CustomerLoginService) {}
  async userLogin(req: Request, res: Response) {
    await this.login.execute(req, res);
  }
}
