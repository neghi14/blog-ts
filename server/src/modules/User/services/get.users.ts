import { injectable } from "tsyringe";
import UserRepository from "../repositories/user.repository";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class GetUsersService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const user: any = await this.userRepository.readAll(req.query);

      if (Number(req.query.skip) * 1 === 0 || Number(user.length) === 0) {
        return next(new ErrorUtility("Page not Found!", 404));
      }

      const data = {
        page: Number(req.query.skip) * 1 || 1,
        limit: Number(req.query.limit) || 10,
        length: user.length,
        doc_length: await this.userRepository.countAll(),
        user,
      };

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Users Retrieved!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
