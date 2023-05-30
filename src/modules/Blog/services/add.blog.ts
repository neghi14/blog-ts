import { injectable } from "tsyringe";
import Http from "../../../common/utils/http.utils";
import { Request, Response } from "express";
import { Blog } from "../../../common/database/model";
import BlogRepository from "../repository/blog.repository";
import Service from "../../../common/interface/service.interface";
import { slugTitle } from "../../../common/utils/slug.utils";

@injectable()
export default class AddBlogService implements Service<Request, Response> {
  constructor(
    private blogRepository: BlogRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response) {
    try {
      const { author, title, content } = req.body;
      const newBlogPayload: Blog = {
        author,
        title,
        slug: slugTitle(title),
        content,
      };

      const data = await this.blogRepository.createBlog(newBlogPayload);

      this.http.Response({
        res,
        statuscode: 201,
        status: "success",
        message: "Blog has been created successfully",
        data,
      });
    } catch (error: any) {
      this.http.Response({
        res,
        statuscode: 503,
        status: "error",
        message: error.message,
      });
    }
  }
}
