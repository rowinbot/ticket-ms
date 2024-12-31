import { AppRouter } from "../utils/app-router.ts";
import { AppConfig } from "../utils/config.ts";
import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../middlewares/error.middleware.ts";

import pkgJson from "../../package.json";

import { EventRouter } from "./event/event.router.ts";

export class BaseRouter extends AppRouter {
  constructor(appConfig: AppConfig, errorMiddleware = new ErrorMiddleware()) {
    super();

    // SETUP SUB ROUTERS
    this.router.use("/events", new EventRouter(appConfig).router);

    // General handlers for the base router
    this.router.use(/\/$/i, this.helloWorld);
    this.router.use("*", errorMiddleware.handleNotFound);
    this.router.use(errorMiddleware.handleGenericError);
    this.router.use("*", this.notFound);
  }

  helloWorld = (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ status: "Operational", version: pkgJson.version });
  };

  notFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).send();
  };
}
