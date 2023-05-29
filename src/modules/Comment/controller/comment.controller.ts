import { injectable } from "tsyringe";
import { Request, Response } from "express";
import AddComment from "../services/addcomment.service";
import RestrictComment from "../services/admin/restrict.service";
import GetComment from "../services/getcomment.service";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";

@injectable()
export default class CommentController {
  constructor(
    private addComment: AddComment,
    private restrictComment: RestrictComment,
    private getComment: GetComment,
    private commentRepository: CommentRepository,
    private http: Http
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.commentRepository.getAllComment();

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "All comments have been retrieved",
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
  async getOne(req: Request, res: Response) {
    await this.getComment.execute(req, res);
  }

  async createComment(req: Request, res: Response) {
    await this.addComment.execute(req, res);
  }

  async adminRestrictComment(req: Request, res: Response) {
    await this.restrictComment.execute(req, res);
  }
}
