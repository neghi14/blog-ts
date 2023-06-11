import { injectable } from "tsyringe";
import Service from "../../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../repositories/user.repository";
import Http from "../../../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../../../common/helpers/error.helper";
import crypto from "crypto";

@injectable()
export default class ForgotPasswordService implements Service<Request, Response, NextFunction> {
  constructor(private user: UserRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { email } = req.body;

      const user: any = await this.user.readOne({ email });

      if (!user) return next(new ErrorUtility("User not Found!", 404));
      const token = crypto.randomBytes(3).toString("hex");
      const reset_token = crypto.createHash("sha256").update(token).digest("hex");

      await this.user.updateOne(user._id, { reset_token, reset_token_active: Date.now() + 5 * (60 * 1000) });
      const data = {
        reset_token,
        token,
      };
      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Password reset Token generated!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
