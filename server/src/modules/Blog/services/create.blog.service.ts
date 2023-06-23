import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import BlogRepository from "../repository/blog.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Blog } from "../../../common/database/model";
import { slugTitle } from "../../../common/utils/slug.utils";

@injectable()
export default class CreateBlogService implements Service<Request, Response, NextFunction> {
  constructor(private blogRepository: BlogRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { title, body, thumbnail } = req.body;
      const { _id } = res.locals.user;

      const newBlogPayload: Blog = {
        author: _id,
        title,
        body,
        thumbnail,
        slug: slugTitle(title),
      };

      const data = await this.blogRepository.createOne(newBlogPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Blog Published!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
