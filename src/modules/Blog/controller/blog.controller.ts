import { injectable } from "tsyringe";
import { Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import AddBlogService from "../services/add.blog";
import GetBlogService from "../services/get.blog";
import GetBlogsService from "../services/get.blogs";
import DeleteBlogService from "../services/admin/delete.blog";
import EditBlogService from "../services/edit.blog";

@injectable()
export default class BlogController {
  constructor(
    private addBlog: AddBlogService,
    private getBlog: GetBlogService,
    private getBlogs: GetBlogsService,
    private editBlog: EditBlogService,
    private removeBlog: DeleteBlogService
  ) {}

  async getAll(req: Request, res: Response) {
    await this.getBlogs.execute(req, res);
  }
  async getOne(req: Request, res: Response) {
    await this.getBlog.execute(req, res);
  }
  async postBlog(req: Request, res: Response) {
    await this.addBlog.execute(req, res);
  }
  async patchBlog(req: Request, res: Response) {
    await this.editBlog.execute(req, res);
  }
  async deleteBlog(req: Request, res: Response) {
    await this.removeBlog.execute(req, res);
  }
}
