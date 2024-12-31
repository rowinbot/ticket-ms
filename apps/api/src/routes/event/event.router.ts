import { AppRouter } from "../../utils/app-router.ts";
import { AppConfig } from "../../utils/config.ts";
import { EventController } from "./event.controller.ts";

export class EventRouter extends AppRouter {
  constructor(
    appConfig: AppConfig,
    controller = new EventController(appConfig),
  ) {
    super();

    this.router.get("/", controller.getUpcomingEvents);
  }
}
