import express, { Express } from "express";
import cors from "cors";

import { AppConfig } from "./utils/config.ts";
import { GlobalDB } from "./utils/db.ts";
import { BaseRouter } from "./routes/base.router.ts";
import morgan from "morgan";
import { AppContext, defaultContext } from "./constants/context.ts";
import { Server } from "http";
import bodyParser from "body-parser";

/**
 * Used to create the base express app (shared across all environments:
 * local with http server, or serverless request handler).
 */
export function createApp(): Express {
  return express();
}

/**
 * Used to setup the app with the baseline configuration.
 */
export async function setupApp(
  _server: Server,
  app: Awaited<ReturnType<typeof createApp>>,
  appConfig: AppConfig,
): Promise<void> {
  /** SETUP DB */
  GlobalDB.setup(appConfig.db);

  /* PLUGINS: */
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: appConfig.enabledOrigins,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      credentials: true,
      allowedHeaders: [
        "Accept",
        "Authorization",
        "Content-Type",
        "Referer",
        "Sec-Ch-Ua",
        "Sec-Ch-Ua-Mobile",
        "Sec-Ch-Ua-Platform",
        "User-Agent",
        "X-Auth-Provider",
        "X-Channel",
      ],
    }),
  );
  app.use(bodyParser.json());

  /* SETUP APP CONTEXT FOR MIDDLEWARES */
  app.use((req, res, next) => {
    res.locals = {
      ...res.locals,
      ...defaultContext,
    } satisfies AppContext;
    next();
  });

  /* SETUP BASE ROUTER */
  app.use(new BaseRouter(appConfig).router);
}
