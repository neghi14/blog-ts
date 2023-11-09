import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import GetBlogService from "../services/get.blog";
import GetBlogsService from "../services/get.blogs";
import CreateBlogService from "../services/create.blog.service";

@injectable()
export default class BlogController {
  constructor(
    private getBlogService: GetBlogService,
    private getBlogsService: GetBlogsService,
    private createBlogService: CreateBlogService
  ) {}

  async getBlogs(req: Request, res: Response, next: NextFunction) {
    await this.getBlogsService.execute(req, res, next);
  }
  async getBlog(req: Request, res: Response, next: NextFunction) {
    await this.getBlogService.execute(req, res, next);
  }
  async createBlog(req: Request, res: Response, next: NextFunction) {
    await this.createBlogService.execute(req, res, next);
  }
}
