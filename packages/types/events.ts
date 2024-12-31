export enum EventUserType {
  local = "local",
  tourist = "tourist",
}

export type EventDTO = EventLocalDTO | EventTouristDTO;

export interface EventLocalDTO {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  dateISO: string;
  location: string;
  userType: EventUserType.local;
}

export interface EventTouristDTO {
  id: number;
  title: string;
  shortDescription: string;
  dateISO: string;
  location: string;
  userType: EventUserType.tourist;
}
