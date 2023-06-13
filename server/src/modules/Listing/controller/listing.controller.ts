import { injectable } from "tsyringe";
import GetListingService from "../services/get.listing.service";
import CreateListingService from "../services/create.listing.service";
import DeleteListingService from "../services/delete.listing.service";
import { NextFunction, Request, Response } from "express";

@injectable()
export default class ListingController {
  constructor(
    private getListingService: GetListingService,
    private createListingService: CreateListingService,
    private deleteListingService: DeleteListingService
  ) {}
  async getListings(req: Request, res: Response, next: NextFunction) {
    await this.getListingService.execute(req, res, next);
  }
  async createListing(req: Request, res: Response, next: NextFunction) {
    await this.createListingService.execute(req, res, next);
  }
  async deleteListing(req: Request, res: Response, next: NextFunction) {
    await this.deleteListingService.execute(req, res, next);
  }
}
