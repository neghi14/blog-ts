import config from "./config/config";
import express from "express";
import MongoDB from "./config/db";

import { UserRoutes } from "./routes/userRoutes";
import { BlogRoutes } from "./routes/blogRoutes";

(function () {
  const app: express.Application = express();

  new UserRoutes(app);
  new BlogRoutes(app);

  app.listen(config.port, () => {
    new MongoDB();
    console.log(`connected successfully on ${config.port}`);
  });
})();
