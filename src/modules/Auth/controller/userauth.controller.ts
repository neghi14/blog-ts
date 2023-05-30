import { injectable } from "tsyringe";
import { Request, Response } from "express";
import CustomerLoginService from "../services/customer/login.customer";
import EditAccountService from "../services/customer/edit.customer";
import DeleteAccountService from "../services/customer/delete.customer";
import ChangePasswordService from "../services/customer/change.customer";

@injectable()
export default class UserAuthController {
  constructor(
    private login: CustomerLoginService,
    private editCustomer: EditAccountService,
    private deleteCustomer: DeleteAccountService,
    private changePassword: ChangePasswordService
  ) {}

  async userLogin(req: Request, res: Response) {
    await this.login.execute(req, res);
  }

  async userEdit(req: Request, res: Response) {
    await this.editCustomer.execute(req, res);
  }

  async userDelete(req: Request, res: Response) {
    await this.deleteCustomer.execute(req, res);
  }

  async userPasswordChange(req: Request, res: Response) {
    await this.changePassword.execute(req, res);
  }
}
