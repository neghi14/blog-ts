import { NextFunction, Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import BlogRepository from "../repository/blog.repository";
import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class GetBlogService implements Service<Request, Response, NextFunction> {
  constructor(private blogRepository: BlogRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog: any = await this.blogRepository.readOne({ _id: id });
      let data;
      if (blog.is_deleted) {
        data = blog;
      } else {
        data = await this.blogRepository.updateOne(blog._id, { view_count: blog.view_count + 1 });
      }

      if (!data) return next(new ErrorUtility("Blogpost not Found", 404));

      this.http.Response({
        res,
        statuscode: 200,
        status: "success",
        message: "Blog has been retrieved",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
