import { AppService } from "../../utils/app-service.ts";
import { type EventDTO, EventUserType } from "@ticket-ms/types/events.ts";
import type { PaginationRequest } from "@ticket-ms/types/pagination.ts";

export class EventService extends AppService {
  async getUpcomingEvents(
    pagination: PaginationRequest,
    userType: EventUserType,
  ): Promise<EventDTO[]> {
    const db = await this.getDb();

    const events = await db.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        description: userType === EventUserType.local,
        short_description: true,
        date: true,
        location: true,
      },
      skip: pagination.page * pagination.pageSize,
      take: pagination.pageSize,
    });

    return events.map((event): EventDTO => {
      if (userType === EventUserType.local) {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          shortDescription: event.short_description,
          dateISO: event.date.toISOString(),
          location: event.location,
          userType,
        };
      }

      return {
        id: event.id,
        title: event.title,
        shortDescription: event.short_description,
        dateISO: event.date.toISOString(),
        location: event.location,
        userType,
      };
    });
  }
}
