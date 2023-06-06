import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import SessionRepository from "../repository/session.repository";
import Http from "../../../common/utils/http.utils";
import { ParsedQs } from "qs";
import { FilterQuery } from "mongoose";
import ErrorUtility from "../../../common/helpers/error.helper";
import Session from "../../../common/database/model/session.model";

@injectable()
export default class UpdateSessionService implements Service<Request, Response, NextFunction> {
  constructor(private sessionRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, Session, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id } = req.params;
      const { is_valid } = req.body;

      const newSessionPayload: Session = {
        is_valid,
        updated_at: new Date(),
      };

      const data = await this.sessionRepository.updateOne(id, newSessionPayload);

      if (!data) return next(new ErrorUtility("Session not Found!", 404));

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Session Updated!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
