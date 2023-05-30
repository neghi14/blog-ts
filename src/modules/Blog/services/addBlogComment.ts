import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { Request, Response } from "express";
import BlogRepository from "../repository/blog.repository";
import CommentRepository from "../../Comment/repository/comment.repository";
import Http from "../../../common/utils/http.utils";
import { Comment } from "../../../common/database/model";

@injectable()
export default class AddBlogCommentService
  implements Service<Request, Response>
{
  constructor(
    private blogRepository: BlogRepository,
    private commentRepository: CommentRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      const { body } = req.body;

      const blog = await this.blogRepository.readSingleBlog({ slug });

      const newCommentpayload: Comment = {
        body,
        post: blog._id,
      };

      const data = await this.commentRepository.createComment(
        newCommentpayload
      );

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment Successfully Added",
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
