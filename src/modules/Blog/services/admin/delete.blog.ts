import { Request, Response } from "express";
import Service from "../../../../common/interface/service.interface";
import Http from "../../../../common/utils/http.utils";
import BlogRepository from "../../repository/blog.repository";
import { injectable } from "tsyringe";

@injectable()
export default class DeleteBlog implements Service<Request, Response> {
  constructor(private blogRepository: BlogRepository, private http: Http) {}
  async execute(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.blogRepository.removeBlog(id);
      this.http.Response({
        res,
        statuscode: 204,
        status: "success",
        message: "Blog has been deleted",
      });
    } catch (error: any) {
      this.http.Response({
        res,
        statuscode: 500,
        status: "error",
        message: error.message,
      });
    }
  }
}
