import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import SessionRepository from "../repository/session.repository";
import Http from "../../../common/utils/http.utils";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class GetSessionsService implements Service<Request, Response, NextFunction> {
  constructor(private sessionsRepository: SessionRepository, private http: Http) {}
  async execute(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const sessions: any = await this.sessionsRepository.readAll(req.query);

      if (Number(req.query.skip) * 1 === 0 || Number(sessions.length) === 0) return next(new ErrorUtility("Page not Found!", 404));

      const data = {
        page: Number(req.query.skip || 1),
        limit: Number(req.query.limit || 10),
        length: sessions.length,
        doc_count: await this.sessionsRepository.countAll(),
        sessions,
      };
      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Session Retrived!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
