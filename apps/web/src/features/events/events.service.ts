import { EventDTO, EventUserType } from "@ticket-ms/types/events";
import { api } from "../../utils/api";

export interface FormattedEvent {
  id: number;
  title: string;
  description?: string;
  shortDescription: string;
  date: string;
  location: string;
  userType: EventUserType;
}

function formatEventDate(dateISO: string, language = "en-US") {
  // TODO: Optimize this function to avoid creating a new Intl.DateTimeFormat instance every time
  const intl = new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
  });

  return intl.format(new Date(dateISO));
}

function formatEvent(event: EventDTO): FormattedEvent {
  return {
    id: event.id,
    title: event.title,
    description: "description" in event ? event.description : undefined,
    shortDescription: event.shortDescription,
    date: formatEventDate(event.dateISO),
    location: event.location,
    userType: event.userType,
  };
}

export async function fetchEvents({
  pageParam: { userType, cursor, pageSize, searchTitle, searchDescription },
}: {
  pageParam: {
    userType: EventUserType;
    cursor: number;
    pageSize: number;
    searchTitle: string;
    searchDescription: string;
  };
}) {
  const response = await api.get<EventDTO[]>("/events", {
    params: {
      userType,
      pageSize,
      cursor,
      title: searchTitle,
      description: searchDescription,
    },
  });

  // Artificial delay to simulate network latency
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return response.data.map(formatEvent);
}
