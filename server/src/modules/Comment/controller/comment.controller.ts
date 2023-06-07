import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import RestrictComment from "../services/admin/restrict.comment";
import GetCommentsService from "../services/get.comments";
import AddCommentService from "../services/create.comment";
import GetCommentService from "../services/get.comment";
import DeleteCommentService from "../services/delete.comment";
import EditCommentService from "../services/edit.comment";
import CONTROLLER from "../../../common/interface/controller.interface";

@injectable()
export default class CommentController implements CONTROLLER<Request, Response, NextFunction> {
  constructor(
    private getComment: GetCommentService,
    private getAllComments: GetCommentsService,
    private addComment: AddCommentService,
    private editComment: EditCommentService,
    private removeComment: DeleteCommentService,
    private restrictComment: RestrictComment
  ) {}

  async readAll(req: Request, res: Response, next: NextFunction) {
    await this.getAllComments.execute(req, res, next);
  }
  async readOne(req: Request, res: Response, next: NextFunction) {
    await this.getComment.execute(req, res, next);
  }

  async createOne(req: Request, res: Response, next: NextFunction) {
    await this.addComment.execute(req, res, next);
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    await this.editComment.execute(req, res, next);
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    await this.removeComment.execute(req, res, next);
  }

  async adminRestrictComment(req: Request, res: Response, next: NextFunction) {
    await this.restrictComment.execute(req, res, next);
  }
}
