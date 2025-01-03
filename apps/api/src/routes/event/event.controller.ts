import { Request, Response, NextFunction } from "express";
import { AppController } from "../../utils/app-controller.ts";
import { AppConfig } from "../../utils/config.ts";
import { EventService } from "./event.service.ts";
import { invariantValidateRequest } from "../../utils/validation.ts";
import * as z from "zod";
import { EventUserType } from "@ticket-ms/types/events.ts";

export class EventController extends AppController {
  service: EventService;

  private defaultPageSize = 20;

  constructor(config: AppConfig, service = new EventService()) {
    super();
    this.service = service;
  }

  getUpcomingEvents = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { query } = invariantValidateRequest(
        req,
        z.object({
          query: z.object({
            userType: z.nativeEnum(EventUserType),
            cursor: z.coerce.number().optional(),
            pageSize: z.coerce.number().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        }),
      );

      const list = await this.service.getUpcomingEvents(
        {
          cursor: query.cursor ?? 0,
          pageSize: query.pageSize ?? this.defaultPageSize,
        },
        query.userType,
        { title: query.title, description: query.description },
      );

      return res.status(200).json(list);
    } catch (e) {
      next(e);
    }
  };
}
