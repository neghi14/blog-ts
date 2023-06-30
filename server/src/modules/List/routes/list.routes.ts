import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import ListController from "../controller/list.controller";
import ListingController from "../../Listing/controller/listing.controller";
import { verifyLogin } from "../../../common/middleware/auth.middleware";

const listRouter: Router = Router();
const listController = container.resolve(ListController);
const listingController = container.resolve(ListingController);

listRouter
  .get("/", (req: Request, res: Response, next: NextFunction) => listController.getLists(req, res, next))
  .post(
    "/",
    verifyLogin,
    (req: Request, res: Response, next: NextFunction) => listController.createList(req, res, next)
  )
  .get("/listings", (req: Request, res: Response, next: NextFunction) => listingController.getListings(req, res, next))
  .get("/:id", (req: Request, res: Response, next: NextFunction) => listController.getList(req, res, next))
  .patch(
    "/:id",
   verifyLogin,
    (req: Request, res: Response, next: NextFunction) => listController.updateList(req, res, next)
  )

  .post(
    "/:id/listings",
   verifyLogin,
    (req: Request, res: Response, next: NextFunction) => listingController.createListing(req, res, next)
  )
  .delete(
    "/listings/:listing_id",
   verifyLogin,
    (req: Request, res: Response, next: NextFunction) => listingController.deleteListing(req, res, next)
  );

export default listRouter;
