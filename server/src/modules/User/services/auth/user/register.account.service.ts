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
import config from "config";
import Session from "../../../../../common/database/model/session.model";
import { createToken } from "../../../../../common/utils/jwt.utils";
import { get, omit } from "lodash";
import { createHash } from "../../../../../common/utils/bcryptjs.utils";
import crypto from "crypto";

@injectable()
export default class RegisterUserService implements Service<Request, Response, NextFunction> {
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
      //GET REQ BODY
      const { username, password, email, phone, first_name, last_name, role } = req.body;

      //VALIDATE REQ BODY
      if (!username || !password || !email || !first_name || !last_name)
        return next(new ErrorUtility("Invalid Credentials!", 403));

      //CREATE PAYLOAD
      const token = crypto.randomBytes(3).toString("hex");
      const verify_token = crypto.createHash("sha256").update(token).digest("hex");
      const newUserPayload: User = {
        username: username.toLowerCase(),
        password: await createHash(password),
        email,
        first_name: first_name.toLowerCase(),
        last_name: last_name.toLowerCase(),
        phone,
        role,
        verify_token,
        verify_token_active: Date.now() + 5 * (60 * 1000),
      };

      //CREATE USER
      const user: any = await this.userRepository.createOne(newUserPayload);

      //CREATE SESSION
      const session_exp = config.get<string>("sessionTtl");
      const refresh_exp = config.get<string>("refreshTtl");

      const newSessionPayload: Session = {
        user: user._id,
        refresh_token: await createToken({ user }, { expiresIn: refresh_exp }),
        session_token: await createToken({ user }, { expiresIn: session_exp }),
        is_valid: true,
        user_agent: get(req.headers, "user-agent"),
        user_ip: req.ip,
      };
      const session: any = await this.sessionRepository.createOne(newSessionPayload);

      //SET HEADERS
      res.setHeader("x-refresh", session.refresh_token);
      res.setHeader("x-session", session.session_token);

      //SET VERIFICATION URL

      //RETURN RESPONSE
      const data = {
        user,
        session,
        token,
      };

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Account Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
