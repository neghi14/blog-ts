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
      const { username, password, email, phone, name, role } = req.body;

      //VALIDATE REQ BODY
      if (!username || !password || !email || !name) return next(new ErrorUtility("Invalid Credentials!", 403));

      //CREATE PAYLOAD
      const hashedPassword = await createHash(password);

      const newUserPayload = {
        username,
        password: hashedPassword,
        email,
        name: name.toLowerCase(),
        phone,
        role,
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
        userAgent: get(req.headers, "user-agent"),
        user_ip: req.ip,
      };
      const session: any = await this.sessionRepository.createOne(newSessionPayload);

      //SET HEADERS
      res.setHeader("x-refresh", session.refresh_token);
      res.setHeader("x-session", session.session_token);

      //RETURN RESPONSE
      const data = {
        user,
        session,
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
