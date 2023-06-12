import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import CommentRepository from "../../repository/comment.repository";
import Http from "../../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export default class GetReplyService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id, comment_id } = req.params;

      const replies = await this.commentRepository.readAll({ article: id, replied_to: comment_id });

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Replies Retrieved!",
        data: replies,
      });
    } catch (error) {
      return next(error);
    }
  }
}
