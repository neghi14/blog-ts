import { NextFunction, Request, Response, Router } from "express";
import BlogController from "../controller/blog.controller";
import { container } from "tsyringe";
import CommentController from "../../Comment/controller/comment.controller";

const blogController = container.resolve(BlogController);
const commentController = container.resolve(CommentController);
const blogRouter = Router();

blogRouter
  .get("/", (req: Request, res: Response, next: NextFunction) => blogController.getBlogs(req, res, next))
  .get("/:id", (req: Request, res: Response, next: NextFunction) => blogController.getBlog(req, res, next))
  .get("/:id/comments/:comment_id", (req: Request, res: Response, next: NextFunction) =>
    commentController.getComment(req, res, next)
  )
  .get("/:id/comments/:comment_id/replies", (req: Request, res: Response, next: NextFunction) =>
    commentController.getReply(req, res, next)
  )
  .post("/:id/comments", (req: Request, res: Response, next: NextFunction) =>
    commentController.createComment(req, res, next)
  )
  .post("/:id/comments/:comment_id/replies", (req: Request, res: Response, next: NextFunction) =>
    commentController.createReply(req, res, next)
  );

export default blogRouter;
