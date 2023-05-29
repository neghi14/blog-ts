import { injectable } from "tsyringe";
import GetUser from "../services/getuser.service";
import { Request, Response } from "express";
import GetUsers from "../services/getusers.service";
import AddUserService from "../services/admin/adduser.service";
import EditUserService from "../services/edituser.service";
import DeleteUserService from "../services/admin/deleteuser.service";

@injectable()
export default class UserController {
  constructor(
    private getUser: GetUser,
    private getUsers: GetUsers,
    private createUser: AddUserService,
    private editUser: EditUserService,
    private deleteUser: DeleteUserService
  ) {}
  async getAll(req: Request, res: Response) {
    await this.getUsers.execute(req, res);
  }
  async getOne(req: Request, res: Response) {
    await this.getUser.execute(req, res);
  }
  async createOne(req: Request, res: Response) {
    await this.createUser.execute(req, res);
  }
  async updateOne(req: Request, res: Response) {
    await this.editUser.execute(req, res);
  }
  async deleteOne(req: Request, res: Response) {
    await this.deleteUser.execute(req, res);
  }
}
