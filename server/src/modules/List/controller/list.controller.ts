import { injectable } from "tsyringe";
import CreateListService from "../services/create.list.service";
import UpdateListService from "../services/update.list.service";
import GetListsService from "../services/get.lists.service";
import GetListService from "../services/get.list.service";
import { NextFunction, Request, Response } from "express";

@injectable()
export default class ListController {
  constructor(
    private getListsService: GetListsService,
    private getListService: GetListService,
    private createListService: CreateListService,
    private updateListService: UpdateListService
  ) {}
  async getList(req: Request, res: Response, next: NextFunction) {
    await this.getListService.execute(req, res, next);
  }
  async getLists(req: Request, res: Response, next: NextFunction) {
    await this.getListsService.execute(req, res, next);
  }
  async createList(req: Request, res: Response, next: NextFunction) {
    await this.createListService.execute(req, res, next);
  }
  async updateList(req: Request, res: Response, next: NextFunction) {
    await this.updateListService.execute(req, res, next);
  }
}
