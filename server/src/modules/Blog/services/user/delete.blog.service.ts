import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import BlogRepository from "../../repository/blog.repository";
import Http from "../../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../../common/helpers/error.helper";

@injectable()
export default class DeleteUserBlogService implements Service<Request, Response, NextFunction> {
  constructor(private blog: BlogRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { author } = req.body;
      const { blog_id } = req.params;
    
      const blog: any = await this.blog.readOne({ _id: blog_id });
   
      if (author !== blog.author.toString()) return next(new ErrorUtility("Blog not Found!", 404));
      if (blog.is_deleted) return next(new ErrorUtility("Blog not Found!", 404));

      await this.blog.updateOne(blog._id, { is_deleted: true });

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "Blog Deleted!",
      });
    } catch (error) {
      return next(error);
    }
  }
}
