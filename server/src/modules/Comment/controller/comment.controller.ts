import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import GetCommentsService from "../services/get.comments.service";
import GetCommentService from "../services/get.comment.service";
import CreateCommentService from "../services/create.comment.service";
import CreateReplyService from "../services/reply/create.reply.service";
import GetReplyService from "../services/reply/get.reply.service";

@injectable()
export default class CommentController {
  constructor(
    private getCommentService: GetCommentService,
    private getCommentsService: GetCommentsService,
    private createCommentservice: CreateCommentService,
    private getReplyService: GetReplyService,
    private createReplyService: CreateReplyService
  ) {}

  async getComments(req: Request, res: Response, next: NextFunction) {
    await this.getCommentsService.execute(req, res, next);
  }
  async getComment(req: Request, res: Response, next: NextFunction) {
    await this.getCommentService.execute(req, res, next);
  }
  async createComment(req: Request, res: Response, next: NextFunction) {
    await this.createCommentservice.execute(req, res, next);
  }
  async getReply(req: Request, res: Response, next: NextFunction) {
    await this.getReplyService.execute(req, res, next);
  }
  async createReply(req: Request, res: Response, next: NextFunction) {
    await this.createReplyService.execute(req, res, next);
  }
}
