import { injectable } from "tsyringe";
import AddBlogCommentService from "../services/addBlogComment";
import GetBlogCommentService from "../services/getBlogComments";
import { Request, Response } from "express";

@injectable()
export default class BlogCommentController {
  constructor(private addComment: AddBlogCommentService, private getComment: GetBlogCommentService) {}
  async getBlogComment(req: Request, res: Response) {
    await this.getComment.execute(req, res);
  }

  async postBlogComment(req: Request, res: Response) {
    await this.addComment.execute(req, res);
  }
}
