import { injectable } from "tsyringe";
import UserRepository from "../repositories/user.repository";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class GetUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.userRepository.readSingleUser({ _id: id });

      if (!data) {
        return next(new ErrorUtility("User not Found", 404));
      }

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "User successfully retrieved",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
