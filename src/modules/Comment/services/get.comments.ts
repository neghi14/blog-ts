import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import CommentRepository from "../repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import { Request, Response } from "express";

@injectable()
export default class GetCommentsService implements Service<Request, Response> {
  constructor(private commentRepository: CommentRepository, private http: Http) {}
  async execute(req: Request, res: Response) {
    try {
      const data = await this.commentRepository.readAllComment();

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
}
