import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import AuthenticateUser from "../../controller/auth/user/auth.user";

const authRoute = Router();
const auth = container.resolve(AuthenticateUser);

authRoute
  .post("/login", (req: Request, res: Response, next: NextFunction) => auth.login(req, res, next))
  .post("/register", (req: Request, res: Response, next: NextFunction) => auth.register(req, res, next));

export default authRoute;
