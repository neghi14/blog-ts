import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import BlogRepository from "../../repository/blog.repository";
import CommentRepository from "../../../Comment/repository/comment.repository";
import Http from "../../../../common/utils/http.utils";

@injectable()
export default class GetBlogCommentService implements Service<Request, Response, NextFunction> {
  constructor(
    private blogRepository: BlogRepository,
    private commentRepository: CommentRepository,
    private http: Http
  ) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      const blog: any = await this.blogRepository.readOne({ slug });

      const comments = await this.commentRepository.readOne({
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
        message: "All Coments from this post has been retrieved",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
