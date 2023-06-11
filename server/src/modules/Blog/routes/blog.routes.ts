import { NextFunction, Request, Response, Router } from "express";
import BlogController from "../controller/blog.controller";
import { container } from "tsyringe";
import BlogCommentController from "../controller/comment/comment.controller";

const blogRouter: Router = Router();

const blogController = container.resolve(BlogController);
const blogCommentController = container.resolve(BlogCommentController);

blogRouter
  .get("/all", (req: Request, res: Response, next: NextFunction) => blogController.readAll(req, res, next))
  .post("/new", (req: Request, res: Response, next: NextFunction) => blogController.createOne(req, res, next))
  .post("/delete/:blog_id", (req: Request, res: Response, next: NextFunction) =>
    blogController.deleteUserBlog(req, res, next)
  );

blogRouter
  .get("/:id", (req: Request, res: Response, next: NextFunction) => blogController.readOne(req, res, next))
  .patch("/:id", (req: Request, res: Response, next: NextFunction) => blogController.updateOne(req, res, next))
  .delete("/:id", (req: Request, res: Response, next: NextFunction) => blogController.deleteOne(req, res, next));

// blogRouter
//   .get("/:slug/comment", (req: Request, res: Response, next: NextFunction) =>
//     blogCommentController.getBlogComment(req, res, next)
//   )
//   .post("/:slug/comment", (req: Request, res: Response, next: NextFunction) =>
//     blogCommentController.postBlogComment(req, res, next)
//   );

export default blogRouter;
