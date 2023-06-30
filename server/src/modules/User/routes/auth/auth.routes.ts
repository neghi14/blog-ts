import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import AuthenticateUser from "../../controller/auth/user/auth.user";
import { verifyLogin } from "../../../../common/middleware/auth.middleware"; 

const authRouter = Router();
const auth = container.resolve(AuthenticateUser);

authRouter
  .post("/login", (req: Request, res: Response, next: NextFunction) => auth.login(req, res, next))
  .post("/register", (req: Request, res: Response, next: NextFunction) => auth.register(req, res, next))
  .post("/delete-me", verifyLogin(), (req: Request, res: Response, next: NextFunction) => auth.delete(req, res, next))
  .post("/change-password", verifyLogin(), (req: Request, res: Response, next: NextFunction) =>
    auth.changePassword(req, res, next)
  )
  .post("/change-password/:reset_token", (req: Request, res: Response, next: NextFunction) =>
    auth.changePassword(req, res, next)
  )
  .post("/verify-me", verifyLogin(), (req: Request, res: Response, next: NextFunction) => auth.verifyUser(req, res, next))
  .post("/forgot-password", verifyLogin(), (req: Request, res: Response, next: NextFunction) =>
    auth.forgotUser(req, res, next)
  )
  .post("/refresh-verify", verifyLogin(), (req: Request, res: Response, next: NextFunction) =>
    auth.refreshVerify(req, res, next)
  )
  .post("/refresh-reset", verifyLogin(), (req: Request, res: Response, next: NextFunction) =>
    auth.refreshReset(req, res, next)
  );

export default authRouter;
