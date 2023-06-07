import { injectable } from "tsyringe";
import { Response, Request, NextFunction } from "express";
import Service from "../../../common/interface/service.interface";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";

@injectable()
export default class AddCommentService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.commentRepository.createOne(req.body);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
