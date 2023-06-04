export default interface CONTROLLER<Request, Response, NextFunction> {
  readOne(req: Request, res: Response, next: NextFunction): Promise<unknown>;
  readAll(req: Request, res: Response, next: NextFunction): Promise<unknown>;
  createOne(req: Request, res: Response, next: NextFunction): Promise<unknown>;
  updateOne(req: Request, res: Response, next: NextFunction): Promise<unknown>;
  deleteOne(req: Request, res: Response, next: NextFunction): Promise<unknown>;
}
