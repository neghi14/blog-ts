import { NextFunction, Request, Response, Router } from "express";
import BlogController from "../controller/blog.controller";
import { container } from "tsyringe";
import BlogCommentController from "../controller/blogComment.controller";
import { isLoggedIn } from "../../Auth/middleware";

const blogRouter: Router = Router();

const blogController = container.resolve(BlogController);
const blogCommentController = container.resolve(BlogCommentController);

blogRouter.get("/all", (req: Request, res: Response, next: NextFunction) => blogController.getAll(req, res, next));

blogRouter.post("/", (req: Request, res: Response, next: NextFunction) => blogController.postBlog(req, res, next));

blogRouter
  .get("/:id", (req: Request, res: Response, next: NextFunction) => blogController.getOne(req, res, next))
  .patch("/:id", (req: Request, res: Response, next: NextFunction) => blogController.patchBlog(req, res, next))
  .delete("/:id", (req: Request, res: Response, next: NextFunction) => blogController.deleteBlog(req, res, next));

blogRouter
  .get("/:slug/comment", isLoggedIn, (req: Request, res: Response, next: NextFunction) =>
    blogCommentController.getBlogComment(req, res, next)
  )
  .post("/:slug/comment", isLoggedIn, (req: Request, res: Response, next: NextFunction) =>
    blogCommentController.postBlogComment(req, res, next)
  );

export default blogRouter;
