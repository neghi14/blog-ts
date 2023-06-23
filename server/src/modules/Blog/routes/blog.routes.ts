import { NextFunction, Request, Response, Router } from "express";
import BlogController from "../controller/blog.controller";
import { container } from "tsyringe";
import CommentController from "../../Comment/controller/comment.controller";
import LikesController from "../../Likes/controller/likes.controller";
import { verifyAuth } from "../../../common/middleware/auth.middleware";

const blogController = container.resolve(BlogController);
const commentController = container.resolve(CommentController);
const likesController = container.resolve(LikesController);
const blogRouter = Router();

blogRouter
  .get("/", (req: Request, res: Response, next: NextFunction) => blogController.getBlogs(req, res, next))
  .post(
    "/",
    (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next),
    (req: Request, res: Response, next: NextFunction) => blogController.createBlog(req, res, next)
  )
  .get("/:slug", (req: Request, res: Response, next: NextFunction) => blogController.getBlog(req, res, next))
  .get("/:id/comments/:comment_id", (req: Request, res: Response, next: NextFunction) =>
    commentController.getComment(req, res, next)
  )
  .get("/:id/comments/:comment_id/replies", (req: Request, res: Response, next: NextFunction) =>
    commentController.getReply(req, res, next)
  )
  .post(
    "/:id/comments",
    (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next),
    (req: Request, res: Response, next: NextFunction) => commentController.createComment(req, res, next)
  )
  .post(
    "/:id/likes",
    (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next),
    (req: Request, res: Response, next: NextFunction) => likesController.createOne(req, res, next)
  )
  .post(
    "/:id/comments/:comment_id/replies",
    (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next),
    (req: Request, res: Response, next: NextFunction) => commentController.createReply(req, res, next)
  );

export default blogRouter;
