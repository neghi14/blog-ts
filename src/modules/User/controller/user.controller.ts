import { injectable } from "tsyringe";
import { Request, Response } from "express";
import AddUserService from "../services/add.user";
import EditUserService from "../services/edit.user";
import DeleteUserService from "../services/delete.user";
import GetUserService from "../services/get.user";
import GetUsersService from "../services/get.users";

@injectable()
export default class UserController {
  constructor(
    private getUser: GetUserService,
    private getUsers: GetUsersService,
    private createUser: AddUserService,
    private editUser: EditUserService,
    private removeUser: DeleteUserService
  ) {}
  async getAllUser(req: Request, res: Response) {
    await this.getUsers.execute(req, res);
  }
  async getSingleUser(req: Request, res: Response) {
    await this.getUser.execute(req, res);
  }
  async postUser(req: Request, res: Response) {
    await this.createUser.execute(req, res);
  }
  async patchUser(req: Request, res: Response) {
    await this.editUser.execute(req, res);
  }
  async deleteUser(req: Request, res: Response) {
    await this.removeUser.execute(req, res);
  }
}
