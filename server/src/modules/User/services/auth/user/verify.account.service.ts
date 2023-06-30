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
export default class VerifyUserService implements Service<Request, Response, NextFunction> {
  constructor(private userRepository: UserRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      let user_token;
      const { verify_token } = req.params;
      const { token } = req.body;
      if (token) {
        user_token = crypto.createHash("sha256").update(token).digest("hex");
      } else {
        user_token = verify_token;
      }

      const user: any = await this.userRepository.readOne({ verify_token: user_token });
      if (!user) return next(new ErrorUtility("Invalid token", 400));
      if (user.verify_token_active < Date.now()) return next(new ErrorUtility("Token expired", 403));

      await this.userRepository.updateOne(user._id, {
        is_verified: true,
        updated_at: new Date(),
        verify_token: "",
        verify_token_active: "",
      });

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "User Verified!",
      });
    } catch (error) {
      return next(error);
    }
  }
}
