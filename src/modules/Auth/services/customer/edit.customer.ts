import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../User/repositories/user.repository";
import Http from "../../../../common/utils/http.utils";
import { User } from "../../../../common/database/model";

@injectable()
export default class EditAccountService implements Service<Request, Response, NextFunction> {
  constructor(private userController: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { name, username } = req.body;

      const newUserPayload: User = {
        name,
        username,
        updated_at: new Date(),
      };

      const data = await this.userController.updateUser({ _id: id }, newUserPayload);
      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Successfully Updated User",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
