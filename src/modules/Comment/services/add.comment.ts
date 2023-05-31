import { injectable } from "tsyringe";
import { Response, Request, NextFunction } from "express";
import Service from "../../../common/interface/service.interface";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import { Comment } from "../../../common/database/model";

@injectable()
export default class AddCommentService implements Service<Request, Response, NextFunction> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { author, post, body }: Comment = req.body;

      const newCommentPayload: Comment = {
        author,
        post,
        body,
      };

      const data = await this.commentRepository.createComment(newCommentPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment successfully Added",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
