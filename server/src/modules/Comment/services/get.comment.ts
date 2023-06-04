import { injectable } from "tsyringe";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";

@injectable()
export default class GetCommentService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.commentRepository.readSingleComment({ _id: id });

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "all comments have been retrieved",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
