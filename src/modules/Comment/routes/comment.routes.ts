import express from "express";
import { container } from "tsyringe";
import CommentController from "../controller/comment.controller";

const commentController = container.resolve(CommentController);

const commentRouter: express.Router = express.Router();

commentRouter.get("/all", (req: express.Request, res: express.Response) =>
  commentController.getAll(req, res)
);
commentRouter.post("/", (req: express.Request, res: express.Response) =>
  commentController.createComment(req, res)
);
commentRouter.get("/:id", (req: express.Request, res: express.Response) =>
  commentController.getOne(req, res)
);
commentRouter.patch("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
commentRouter.patch(
  "/restrict/:id",
  (req: express.Request, res: express.Response) =>
    commentController.adminRestrictComment(req, res)
);
commentRouter.delete("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});

export default commentRouter;
