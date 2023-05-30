import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import BlogRepository from "../repository/blog.repository";
import CommentRepository from "../../Comment/repository/comment.repository";
import Http from "../../../common/utils/http.utils";

@injectable()
export default class GetBlogCommentService implements Service<Request, Response> {
  constructor(
    private blogRepository: BlogRepository,
    private commentRepository: CommentRepository,
    private http: Http
  ) {}

  async execute(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      const blog = await this.blogRepository.readSingleBlog({ slug });

      const comments = await this.commentRepository.readAllComment({
        post: blog._id,
      });

      const data = {
        blog: blog,
        comments,
      };

      this.http.Response({
        res,
        status: "success",
        statuscode: 200,
        message: "All Coments fro this post has been retrieved",
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
}
