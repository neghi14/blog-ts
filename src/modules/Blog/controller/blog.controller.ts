import { injectable } from "tsyringe";
import { Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import AddBlog from "../services/add.blog";
import DeleteBlog from "../services/admin/delete.blog";
import GetBlog from "../services/get.blog";

@injectable()
export default class BlogController {
  constructor(
    private addBlog: AddBlog,
    private deleteBlog: DeleteBlog,
    private getBlog: GetBlog
  ) {}

  async getAll(req: Request, res: Response) {
    await this.getBlog.execute(req, res);
  }
  async createBlog(req: Request, res: Response) {
    await this.addBlog.execute(req, res);
  }
  async removeBlog(req: Request, res: Response) {
    await this.deleteBlog.execute(req, res);
  }
}
