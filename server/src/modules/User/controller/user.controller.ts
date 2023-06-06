import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import AddUserService from "../services/create.user";
import EditUserService from "../services/edit.user";
import DeleteUserService from "../services/delete.user";
import GetUserService from "../services/get.user";
import GetUsersService from "../services/get.users";
import CONTROLLER from "../../../common/interface/controller.interface";

@injectable()
export default class UserController implements CONTROLLER<Request, Response, NextFunction> {
  constructor(
    private getUser: GetUserService,
    private getUsers: GetUsersService,
    private createUser: AddUserService,
    private editUser: EditUserService,
    private removeUser: DeleteUserService
  ) {}
  async readAll(req: Request, res: Response, next: NextFunction) {
    await this.getUsers.execute(req, res, next);
  }
  async readOne(req: Request, res: Response, next: NextFunction) {
    await this.getUser.execute(req, res, next);
  }
  async createOne(req: Request, res: Response, next: NextFunction) {
    await this.createUser.execute(req, res, next);
  }
  async updateOne(req: Request, res: Response, next: NextFunction) {
    await this.editUser.execute(req, res, next);
  }
  async deleteOne(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    await this.removeUser.execute(req, res, next);
  }
}
