import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import CommentRepository from "../../repository/comment.repository";
import Http from "../../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Comment } from "../../../../common/database/model";

@injectable()
export default class CreateReplyService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id, comment_id } = req.params;

      const { author, body } = req.body;

      const newReplyPayload: Comment = {
        author,
        body,
        article: id,
        replied_to: comment_id,
      };

      const data = await this.commentRepository.createOne(newReplyPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Reply Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
