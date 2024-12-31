import { EventItemComponent } from "./event-item";

export const EventRow: EventItemComponent = ({ event }) => {
  return (
    <li
      key={event.id}
      className="border-b border-slate-200 rounded-sm pb-2 flex flex-row space-x-3"
    >
      {/* In the data model it doesn't explicitly mention any image field,
          so I'm deciding to ignore it, will just render this image here instead,
          hope you nobody minds! :D */}
      <img
        src="https://rowinbot.com/build/journal/cloudfront-lambda-edge/image.jpg"
        className="h-24 aspect-square object-contain bg-slate-200 rounded-md"
      />

      <div className="space-y-2 flex-1">
        <div className="space-y-0.5">
          <p className="font-serif text-lg leading-tight">{event.title}</p>

          <div className="flex justify-between">
            <p className="text-xs font-bold">{event.location}</p>
            <p className="text-xs">{event.date}</p>
          </div>
        </div>

        <p>{event.shortDescription}</p>
      </div>
    </li>
  );
};
