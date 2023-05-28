export default interface Service<Request, Response> {
  execute(req: Request, res: Response): Promise<void>;
}
