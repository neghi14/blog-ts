import { NextFunction, Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import BlogRepository from "../repository/blog.repository";
import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import ErrorUtility from "../../../common/helpers/error.helper";
import { Blog } from "../../../common/database/model";
import CommentRepository from "../../Comment/repository/comment.repository";

@injectable()
export default class GetBlogService implements Service<Request, Response, NextFunction> {
  constructor(
    private blogRepository: BlogRepository,
    private http: Http,
    private commentRepository: CommentRepository
  ) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const oldBlog: Blog = await this.blogRepository.readOne({ slug });
      let newBlog;
      if (oldBlog.is_deleted) {
        newBlog = oldBlog;
      } else {
        newBlog = await this.blogRepository.updateOne(oldBlog._id || "", {
          view_count: Number(oldBlog.view_count) + 1,
        });
      }

      if (!newBlog) return next(new ErrorUtility("Blogpost not Found", 404));

      const data = newBlog;
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
