import { injectable } from "tsyringe";
import Service from "../../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import BlogRepository from "../../repository/blog.repository";
import CommentRepository from "../../../Comment/repository/comment.repository";
import Http from "../../../../common/utils/http.utils";
import { Comment } from "../../../../common/database/model";

@injectable()
export default class AddBlogCommentService implements Service<Request, Response, NextFunction> {
  constructor(
    private blogRepository: BlogRepository,
    private commentRepository: CommentRepository,
    private http: Http
  ) {}
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      const { body, user } = req.body;

      const blog: any = await this.blogRepository.readOne({ slug });

      const newCommentpayload: Comment = {
        author: user.toString(),
        body,
        post: blog._id,
      };

      const data = await this.commentRepository.createComment(newCommentpayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Comment Successfully Added",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
