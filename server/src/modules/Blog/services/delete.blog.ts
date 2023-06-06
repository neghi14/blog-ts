import { NextFunction, Request, Response } from "express";
import Service from "../../../common/interface/service.interface";
import Http from "../../../common/utils/http.utils";
import BlogRepository from "../repository/blog.repository";
import { injectable } from "tsyringe";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class DeleteBlogService implements Service<Request, Response, NextFunction> {
  constructor(private blogRepository: BlogRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.blogRepository.deleteBlog({ _id: id });

      if (!data) {
        return next(new ErrorUtility("Blog post has either been deleted or does not exist", 404));
      }
      this.http.Response({
        res,
        statuscode: 204,
        status: "success",
        message: "Blog has been deleted",
      });
    } catch (error) {
      return next(error);
    }
  }
}
