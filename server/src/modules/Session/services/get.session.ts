import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import SessionRepository from "../repository/session.repository";
import Http from "../../../common/utils/http.utils";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class GetSessionService implements Service<Request, Response, NextFunction> {
  constructor(private sessionsRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id } = req.params;

      const data = await this.sessionsRepository.readOne({ _id: id });

      if (!data) {
        return next(new ErrorUtility("Session not Found!", 404));
      }
      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Session Found!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
