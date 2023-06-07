import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import { NextFunction, Request, Response } from "express";

@injectable()
export default class GetCommentsService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.commentRepository.readAll(req.query);

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Comments Retrieved",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
