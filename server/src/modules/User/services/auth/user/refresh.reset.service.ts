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
export default class RefreshResetTokenService implements Service<Request, Response, NextFunction> {
  constructor(private user: UserRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { reset_token } = req.params;
      const { token } = req.body;

      let user_token;
      if (token) {
        user_token = crypto.createHash("sha256").update(token).digest("hex");
      } else {
        user_token = reset_token;
      }
      const user: any = await this.user.readOne({ reset_token: user_token });

      if (!user) return next(new ErrorUtility("Invalid Token", 400));

      const new_token = crypto.randomBytes(3).toString("hex");
      const new_reset_token = crypto.createHash("sha256").update(new_token).digest("hex");
      await this.user.updateOne(user._id, {
        reset_token: new_reset_token,
        reset_token_active: Date.now() + 5 * (60 * 1000),
      });
      const data = {
        token: new_token,
        reset_token: new_reset_token,
      };

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Token Refreshed",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
