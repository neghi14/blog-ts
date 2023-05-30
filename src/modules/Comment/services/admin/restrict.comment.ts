import CommentRepository from "../../repository/comment.repository";
import { Request, Response } from "express";
import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import Http from "../../../../common/utils/http.utils";
import { Comment } from "../../../../common/database/model";

@injectable()
export default class RestrictComment implements Service<Request, Response> {
  constructor(
    private commentRepository: CommentRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { restricted } = req.body;

      const restrictComment: Comment = {
        restricted,
        updated_at: new Date(),
      };

      const data = await this.commentRepository.updateComment(
        { _id: id },
        restrictComment
      );

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment has been restricted",
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
