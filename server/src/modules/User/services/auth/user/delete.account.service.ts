import { injectable } from "tsyringe";
import Service from "../../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../repositories/user.repository";
import Http from "../../../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../../../common/helpers/error.helper";

@injectable()
export default class DeleteMeService implements Service<Request, Response, NextFunction> {
  constructor(private user: UserRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { username } = req.body;
      const user: any = await this.user.readOne({ username });

      if (!user.is_active) return next(new ErrorUtility("Account is inactive/deleted", 400));
      const data = await this.user.updateOne(user._id, { is_active: false });

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Account Deleted!",
      });
    } catch (error) {
      return next(error);
    }
  }
}
