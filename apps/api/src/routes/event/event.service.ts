import { AppService } from "../../utils/app-service.ts";
import { type EventDTO, EventUserType } from "@ticket-ms/types/events.ts";
import { type PaginationRequest } from "@ticket-ms/types/pagination.ts";

export class EventService extends AppService {
  async getUpcomingEvents(
    pagination: PaginationRequest,
    userType: EventUserType,
    search: { title?: string; description?: string },
  ): Promise<EventDTO[]> {
    const db = await this.getDb();

    const events = await db.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
        // TODO: implement fuzzy search instead
        title: {
          contains: search.title,
        },
        description: {
          contains: search.description,
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
      skip: pagination.cursor,
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
