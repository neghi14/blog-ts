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
      const blogs: any = await this.blogRepository.readAll(req.query);

      const data = {
        page: Number(req.query.skip) * 1 || 1,
        limit: Number(req.query.limit) || 10,
        length: blogs.length,
        doc_length: await this.blogRepository.countAll(),
        blogs,
      };

      this.http.Response({
        res,
        statuscode: 200,
        status: "success",
        message: "Blogs Retrieved!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
