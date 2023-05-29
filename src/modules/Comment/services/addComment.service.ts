import { injectable } from "tsyringe";
import { Response, Request } from "express";
import Service from "../../../common/interface/service.interface";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import { Comment } from "../../../common/database/model";

@injectable()
export default class AddComment implements Service<Request, Response> {
  constructor(
    private commentRepository: CommentRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response) {
    try {
      const { author, post, body }: Comment = req.body;

      const newCommentPayload: Comment = {
        author,
        post,
        body,
      };

      const data = await this.commentRepository.addComment(newCommentPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment successfully Added",
        data,
      });
    } catch (error: any) {
      this.http.Response({
        res,
        status: "error",
        statuscode: 503,
        message: error.message,
      });
    }
  }
}
