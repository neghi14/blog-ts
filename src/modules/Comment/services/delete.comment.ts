import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";

@injectable()
export default class DeleteCommentService implements Service<Request, Response> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.commentRepository.deleteComment({ _id: id });

      this.http.Response({
        res,
        status: "success",
        statuscode: 204,
        message: "Comment has been deleted",
      });
    } catch (error: any) {
      this.http.Response({
        res,
        status: "error",
        statuscode: 500,
        message: error.message,
      });
    }
  }
}
