import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";

@injectable()
export default class DeleteCommentService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.commentRepository.deleteComment({ _id: id });

      this.http.Response({
        res,
        status: "success",
        statuscode: 204,
        message: "Comment has been deleted",
      });
    } catch (error) {
      return next(error);
    }
  }
}
