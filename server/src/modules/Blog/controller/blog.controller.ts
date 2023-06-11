import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import AddBlogService from "../services/user/create.blog";
import GetBlogService from "../services/get.blog";
import GetBlogsService from "../services/get.blogs";
import DeleteBlogService from "../services/delete.blog";
import EditBlogService from "../services/edit.blog";
import CONTROLLER from "../../../common/interface/controller.interface";
import DeleteUserBlogService from "../services/user/delete.blog.service";

@injectable()
export default class BlogController implements CONTROLLER<Request, Response, NextFunction> {
  constructor(
    private addBlog: AddBlogService,
    private getBlog: GetBlogService,
    private getBlogs: GetBlogsService,
    private editBlog: EditBlogService,
    private removeBlog: DeleteBlogService,
    private deleteBlog: DeleteUserBlogService
  ) {}

  async readAll(req: Request, res: Response, next: NextFunction) {
    await this.getBlogs.execute(req, res, next);
  }
  async readOne(req: Request, res: Response, next: NextFunction) {
    await this.getBlog.execute(req, res, next);
  }
  async createOne(req: Request, res: Response, next: NextFunction) {
    await this.addBlog.execute(req, res, next);
  }
  async updateOne(req: Request, res: Response, next: NextFunction) {
    await this.editBlog.execute(req, res, next);
  }
  async deleteOne(req: Request, res: Response, next: NextFunction) {
    await this.removeBlog.execute(req, res, next);
  }
  async deleteUserBlog(req: Request, res: Response, next: NextFunction) {
    await this.deleteBlog.execute(req, res, next);
  }
}
