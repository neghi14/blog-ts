import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import AuthenticateUser from "../../controller/auth/user/auth.user";

const authRoute = Router();
const auth = container.resolve(AuthenticateUser);

authRoute
  .post("/login", (req: Request, res: Response, next: NextFunction) => auth.login(req, res, next))
  .post("/register", (req: Request, res: Response, next: NextFunction) => auth.register(req, res, next))
  .post("/delete-me", (req: Request, res: Response, next: NextFunction) => auth.delete(req, res, next))
  .post("/change-password", (req: Request, res: Response, next: NextFunction) => auth.changePassword(req, res, next))
  .post("/change-password/:reset_token", (req: Request, res: Response, next: NextFunction) =>
    auth.changePassword(req, res, next)
  )
  .post("/verify-me/:verify_token", (req: Request, res: Response, next: NextFunction) =>
    auth.verifyUser(req, res, next)
  )
  .post("/verify-me", (req: Request, res: Response, next: NextFunction) => auth.verifyUser(req, res, next))
  .post("/forgot-password", (req: Request, res: Response, next: NextFunction) => auth.forgotUser(req, res, next))
  .post("/refresh-verify", (req: Request, res: Response, next: NextFunction) => auth.refreshVerify(req, res, next))
  .post("/refresh-reset", (req: Request, res: Response, next: NextFunction) => auth.refreshReset(req, res, next))
  .post("/refresh-verify/:verify_token", (req: Request, res: Response, next: NextFunction) => auth.refreshVerify(req, res, next))
  .post("/refresh-reset/:reset_token", (req: Request, res: Response, next: NextFunction) => auth.refreshReset(req, res, next));

export default authRoute;
