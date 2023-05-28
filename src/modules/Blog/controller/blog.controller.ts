import { injectable } from "tsyringe";
import { Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import AddBlog from "../services/add.blog";
import DeleteBlog from "../services/admin/delete.blog";
import GetBlog from "../services/get.blog";
import BlogRepository from "../repository/blog.repository";
import { Blog } from "../../../common/database/model";

@injectable()
export default class BlogController {
  constructor(
    private addBlog: AddBlog,
    private deleteBlog: DeleteBlog,
    private getBlog: GetBlog,
    private blogRepository: BlogRepository,
    private http: Http
  ) {}

  async getAll(req: Request, res: Response) {
    await this.getBlog.execute(req, res);
  }
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.blogRepository.getSingleBlog({ _id: id });

      this.http.Response({
        res,
        statuscode: 200,
        status: "success",
        message: "Blog has been retrieved",
        data,
      });
    } catch (error: any) {
      this.http.Response({
        res,
        statuscode: 500,
        status: "error",
        message: error.message,
      });
    }
  }
  async createBlog(req: Request, res: Response) {
    await this.addBlog.execute(req, res);
  }
  async updateBlog(req: Request, res: Response) {
    try {
      const { title, content, author } = req.body;
      const newBlogPayload: Blog = {
        title,
        content,
        author,
        updated_at: new Date(),
      };
      const { id } = req.params;
      const data = await this.blogRepository.editBlog(
        { _id: id },
        newBlogPayload
      );

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Blog data has been updated",
        data,
      });
    } catch (error: any) {
      this.http.Response({
        res,
        status: "error",
        statuscode: 500,
        message: error.message,
      });
    }
  }
  async removeBlog(req: Request, res: Response) {
    await this.deleteBlog.execute(req, res);
  }
}
