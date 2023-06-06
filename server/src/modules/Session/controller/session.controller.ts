import { injectable } from "tsyringe";
import CONTROLLER from "../../../common/interface/controller.interface";
import { NextFunction, Request, Response } from "express";
import GetSessionService from "../services/get.session";
import GetSessionsService from "../services/get.sessions";
import CreateSessionService from "../services/create.session";
import UpdateSessionService from "../services/update.sesssion";
import DeleteSessionService from "../services/delete.sessions";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export default class SessionController implements CONTROLLER<Request, Response, NextFunction> {
  constructor(
    private getSession: GetSessionService,
    private getSessions: GetSessionsService,
    private createSession: CreateSessionService,
    private updateSession: UpdateSessionService,
    private deleteSession: DeleteSessionService
  ) {}
  async readOne(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getSession.execute(req, res, next);
  }
  async readAll(
    req: Request<any, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getSessions.execute(req, res, next);
  }
  async createOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.createSession.execute(req, res, next);
  }
  async updateOne(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.updateSession.execute(req, res, next);
  }
  async deleteOne(
    req: Request<{ id: string }, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.deleteSession.execute(req, res, next);
  }
}
