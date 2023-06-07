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
      const { id } = req.params;

      const data = await this.commentRepository.readOne({ _id: id });
      if (!data) return next(new ErrorUtility("Comment not Found!", 404));

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
