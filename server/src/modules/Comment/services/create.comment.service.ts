import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Comment } from "../../../common/database/model";

@injectable()
export default class CreateCommentService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}

  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const { author, body } = req.body;

      const newCommentPayload: Comment = {
        article: id,
        author,
        body,
      };

      const comment = await this.commentRepository.createOne(newCommentPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment Created!",
        data: comment,
      });
    } catch (error) {
      return next(error);
    }
  }
}
