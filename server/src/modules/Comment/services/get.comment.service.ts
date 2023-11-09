import { injectable } from "tsyringe";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class GetCommentService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { comment_id } = req.params;

      const comment = await this.commentRepository.readOne({ _id: comment_id });
      const reply = await this.commentRepository.readAll({ replied_to: comment_id });
      if (!comment) return next(new ErrorUtility("Comment not Found!", 404));

      const data = {
        comment,
        replies: reply,
      };
      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Comment Retrieved!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
