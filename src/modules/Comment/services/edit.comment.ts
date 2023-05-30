import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import { Comment } from "../../../common/database/model";

@injectable()
export default class EditCommentService implements Service<Request, Response> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { body } = req.body;

      const newCommentPayload: Comment = {
          body,
          updated_at:  new Date()
      };
      const data = await this.commentRepository.updateComment({ _id: id }, newCommentPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment Has been updated",
        data,
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
