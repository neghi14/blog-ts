import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../User/repositories/user.repository";
import Http from "../../../../common/utils/http.utils";
import { createHash } from "../../../../common/utils/bcryptjs.utils";
import { User } from "../../../../common/database/model";
import ErrorUtility from "../../../../common/helpers/error.helper";

@injectable()
export default class ChangePasswordService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { password, confirm_password } = req.body;

      if (password !== confirm_password) {
        return next(new ErrorUtility("Passwords Don't match", 400));
      }

      const hashPassword = await createHash(password);

      const newUserPayload: User = {
        password: hashPassword,
        updated_at: new Date(),
      };

      const data = await this.userRepository.updateUser({ _id: id }, newUserPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Successfully Updated password",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
