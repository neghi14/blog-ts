import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import RestrictComment from "../services/admin/restrict.comment";
import GetCommentsService from "../services/get.comments";
import AddCommentService from "../services/add.comment";
import GetCommentService from "../services/get.comment";
import DeleteCommentService from "../services/delete.comment";
import EditCommentService from "../services/edit.comment";

@injectable()
export default class CommentController {
  constructor(
    private getComment: GetCommentService,
    private getAllComments: GetCommentsService,
    private addComment: AddCommentService,
    private editComment: EditCommentService,
    private removeComment: DeleteCommentService,
    private restrictComment: RestrictComment
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    await this.getAllComments.execute(req, res, next);
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    await this.getComment.execute(req, res, next);
  }

  async postComment(req: Request, res: Response, next: NextFunction) {
    await this.addComment.execute(req, res, next);
  }

  async patchComment(req: Request, res: Response, next: NextFunction) {
    await this.editComment.execute(req, res, next);
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    await this.removeComment.execute(req, res, next);
  }

  async adminRestrictComment(req: Request, res: Response, next: NextFunction) {
    await this.restrictComment.execute(req, res, next);
  }
}
