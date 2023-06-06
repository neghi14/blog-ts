import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import Http from "../../../common/utils/http.utils";
import { createHash } from "../../../common/utils/bcryptjs.utils";
import { User } from "../../../common/database/model";

@injectable()
export default class AddUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, name, email, phone } = req.body;

      const hashedPassword = await createHash(password);

      const newUserPayload: User = {
        username: username.toLowerCase(),
        password: hashedPassword,
        name,
        email,
        phone,
      };

      const data = await this.userRepository.createOne(newUserPayload);
      
      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "User Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
