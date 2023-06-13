import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import SessionRepository from "../repository/session.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Session from "../../../common/database/model/session.model";
import config from "config";
import { createToken } from "../../../common/utils/jwt.utils";
import { get } from "lodash";

@injectable()
export default class CreateSessionService implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, Session, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { user } = req.body;

      const session_exp = config.get<string>("sessionTtl");
      const refresh_exp = config.get<string>("refreshTtl");
      const newSessionPayload: Session = {
        refresh_token: createToken({ _id: user }, { expiresIn: refresh_exp }),
        session_token: createToken({ _id: user }, { expiresIn: session_exp }),
        user_agent: get(req.headers, "user-agent") || "",
        user_ip: req.ip,
        is_valid: true,
      };

      const data = await this.sessionRepository.createOne(newSessionPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Session Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
