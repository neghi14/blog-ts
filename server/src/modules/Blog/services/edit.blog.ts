import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import BlogRepository from "../repository/blog.repository";
import Http from "../../../common/utils/http.utils";
import { Blog } from "../../../common/database/model";

@injectable()
export default class EditBlogService implements Service<Request, Response, NextFunction> {
  constructor(private blogRepository: BlogRepository, private http: Http) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, author } = req.body;
      const newBlogPayload: Blog = {
        title,
        content,
        author,
        updated_at: new Date(),
      };
      const { id } = req.params;
      const data = await this.blogRepository.updateBlog({ _id: id }, newBlogPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Blog data has been updated",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
