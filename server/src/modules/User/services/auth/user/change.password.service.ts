import { injectable } from "tsyringe";
import Service from "../../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../repositories/user.repository";
import Http from "../../../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../../../common/helpers/error.helper";
import { User } from "../../../../../common/database/model";
import { compareHash, createHash } from "../../../../../common/utils/bcryptjs.utils";
import crypto from "crypto";

@injectable()
export default class ChangePasswordService implements Service<Request, Response, NextFunction> {
  constructor(private user: UserRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { reset_token } = req.params;
      const { user_id, old_password, password, confirm_password, token } = req.body;

      let user_token;

      if (token) {
        user_token = crypto.createHash("sha256").update(token).digest("hex");
      } else {
        user_token = reset_token;
      }
      if (password !== confirm_password) return next(new ErrorUtility("Passwords don't match", 400));

      const user: any =
        (await this.user.readOne({ _id: user_id })) || (await this.user.readOne({ reset_token: user_token }));

      if (!user.is_active) return next(new ErrorUtility("Account is Invalid/Deleted", 400));

      //CHECK PASSWORDS
      const check = compareHash(old_password, user.password);

      if (!check) return next(new ErrorUtility("Password doesn't match previos password", 400));
      await this.user.updateOne(user._id, {
        password: createHash(password),
        updated_at: new Date(),
        reset_token: "",
        reset_token_active: "",
      });

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Passwords Updated!",
      });
    } catch (error) {
      return next(error);
    }
  }
}
