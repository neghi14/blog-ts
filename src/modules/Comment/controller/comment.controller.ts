import { injectable } from "tsyringe";
import { Request, Response } from "express";
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

  async getAll(req: Request, res: Response) {
    await this.getAllComments.execute(req, res);
  }
  async getOne(req: Request, res: Response) {
    await this.getComment.execute(req, res);
  }

  async postComment(req: Request, res: Response) {
    await this.addComment.execute(req, res);
  }

  async patchComment(req: Request, res: Response) {
    await this.editComment.execute(req, res);
  }

  async deleteComment(req: Request, res: Response) {
    await this.removeComment.execute(req, res);
  }

  async adminRestrictComment(req: Request, res: Response) {
    await this.restrictComment.execute(req, res);
  }
}
