import { injectable } from "tsyringe";
import Http from "../../../../common/utils/http.utils";
import { NextFunction, Request, Response } from "express";
import { Blog } from "../../../../common/database/model";
import BlogRepository from "../../repository/blog.repository";
import Service from "../../../../common/interface/service.interface";

@injectable()
export default class AddBlogService implements Service<Request, Response, NextFunction> {
  constructor(private blogRepository: BlogRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { author, title, body, thumbnail, sub_title } = req.body;
      const newBlogPayload: Blog = {
        author,
        title,
        body,
        sub_title,
        thumbnail,
      };

      const data = await this.blogRepository.createOne(newBlogPayload);

      this.http.Response({
        res,
        statuscode: 201,
        status: "success",
        message: "Blog Created!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
