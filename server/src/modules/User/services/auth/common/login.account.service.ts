import { injectable } from "tsyringe";
import Service from "../../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../repositories/user.repository";
import SessionRepository from "../../../../Session/repository/session.repository";
import Http from "../../../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { User } from "../../../../../common/database/model";
import ErrorUtility from "../../../../../common/helpers/error.helper";
import { compareHash, createHash } from "../../../../../common/utils/bcryptjs.utils";
import Session from "../../../../../common/database/model/session.model";
import { createToken } from "../../../../../common/utils/jwt.utils";
import config from "config";
import { get, omit } from "lodash";

@injectable()
export default class UserLoginService implements Service<Request, Response, NextFunction> {
  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private http: Http
  ) {}
  async execute(
    req: Request<ParamsDictionary, any, User, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { username, password } = req.body;

      //VALIDATE INPUT
      if (!username || !password) return next(new ErrorUtility("User Credentials Invalid", 400));

      //GET USER
      const user: any = await this.userRepository.readOne({ username });
      if (!user) return next(new ErrorUtility("User not Found!", 404));

      //VALIDATE PASSWORD
      const verifiedPassword = await compareHash(password, user.password);
      if (!verifiedPassword) return next(new ErrorUtility("Passwords Don't Match", 403));

      //CREATE SESSION TOKEN
      const session_exp = config.get<string>("sessionTtl");
      const refresh_exp = config.get<string>("refreshTtl");

      //
      const token = await createToken({ user }, { expiresIn: session_exp });
      const newSessionPayload: Session = {
        user: user._id,
        refresh_token: createToken({ user, session: token }, { expiresIn: refresh_exp }),
        session_token: token,
        is_valid: true,
        user_agent: get(req.headers, "user-agent"),
        user_ip: req.ip,
      };
      const session: any = await this.sessionRepository.createOne(newSessionPayload);

      //SET HEADERS
      res.setHeader("x-refresh", session.refresh_token);
      res.setHeader("x-session", session.session_token);

      //RETURN DATA
      const data = {
        user: omit(user.toJSON(), "password"),
        session,
      };
      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Login Successfull!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
