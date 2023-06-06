import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import Http from "../../../common/utils/http.utils";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class DeleteUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.userRepository.deleteOne(id);

      if (!data) return next(new ErrorUtility("User not Found!", 404));

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "User Deleted!",
      });
    } catch (error) {
      return next(error);
    }
  }
}
