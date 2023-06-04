import { injectable } from "tsyringe";
import AddBlogCommentService from "../services/addBlogComment";
import GetBlogCommentService from "../services/getBlogComments";
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
