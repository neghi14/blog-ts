import { NextFunction, Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import BlogRepository from "../repository/blog.repository";
import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";

@injectable()
export default class GetBlogsService implements Service<Request, Response, NextFunction> {
  constructor(private blogRepository: BlogRepository, private http: Http) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.blogRepository.readAllBlog();

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
