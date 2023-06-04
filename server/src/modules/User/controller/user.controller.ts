import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
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
  async getAllUser(req: Request, res: Response, next: NextFunction) {
    await this.getUsers.execute(req, res, next);
  }
  async getSingleUser(req: Request, res: Response, next: NextFunction) {
    await this.getUser.execute(req, res, next);
  }
  async postUser(req: Request, res: Response, next: NextFunction) {
    await this.createUser.execute(req, res, next);
  }
  async patchUser(req: Request, res: Response, next: NextFunction) {
    await this.editUser.execute(req, res, next);
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    await this.removeUser.execute(req, res, next);
  }
}
