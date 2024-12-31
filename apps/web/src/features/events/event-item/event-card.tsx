import { EventItemComponent } from "./event-item";

export const EventCard: EventItemComponent = ({ event }) => {
  return (
    <li key={event.id} className="bg-slate-200 rounded-sm p-2 space-y-4">
      <div className="space-y-0.5">
        <p className="font-serif text-lg">{event.title}</p>

        <div className="flex justify-between">
          <p className="text-xs font-bold">{event.location}</p>
          <p className="text-xs">{event.date}</p>
        </div>
      </div>

      <p>{event.shortDescription}</p>
    </li>
  );
};
