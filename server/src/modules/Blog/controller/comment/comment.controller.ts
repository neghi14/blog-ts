import { injectable } from "tsyringe";
import AddBlogCommentService from "../../services/comment/add.comment";
import GetBlogCommentService from "../../services/comment/get.comments";
import { NextFunction, Request, Response } from "express";

@injectable()
export default class BlogCommentController {
  constructor(private addComment: AddBlogCommentService, private getComment: GetBlogCommentService) {}
  async getBlogComment(req: Request, res: Response, next: NextFunction) {
    await this.getComment.execute(req, res, next);
  }

  async postBlogComment(req: Request, res: Response, next: NextFunction) {
    await this.addComment.execute(req, res, next);
  }
}
