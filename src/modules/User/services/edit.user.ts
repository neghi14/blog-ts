import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import Http from "../../../common/utils/http.utils";
import { createHash } from "../../../common/utils/bcryptjs.utils";
import { User } from "../../../common/database/model";

@injectable()
export default class EditUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { username, name, email, is_active, password } = req.body;

      const hashedPassword = await createHash(password);

      const newUserPayload: User = {
        username,
        name,
        email,
        is_active,
        password: hashedPassword,
        updated_at: new Date(),
      };

      const data = await this.userRepository.updateUser({ _id: id }, newUserPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "User data has been updated",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
