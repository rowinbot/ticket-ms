import { useSearchState } from "../hooks/use-search-state";
import { EventUserType } from "@ticket-ms/types/events";
import { useState } from "react";
import { TextField } from "~/components/text-field";
import { EventList } from "~/features/events/event-list";

export function HomeView() {
  const [userType, setUserType] = useSearchState({
    defaultState: EventUserType.local,
    key: "userType",
    serializer: {
      write: (value) => value,
      read: (value) => value as EventUserType,
    },
  });

  const [searchTitle, setSearchTitle] = useState("");
  const [searchDescription, setSearchDescription] = useState("");

  return (
    <div>
      <h1>Welcome to TicketMS</h1>
      <div className="sticky top-0 py-4 bg-white z-50 border-b border-black">
        <p>
          You are currently viewing the site as a{" "}
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as EventUserType)}
          >
            <option value={EventUserType.local}>Local</option>
            <option value={EventUserType.tourist}>Tourist</option>
          </select>
        </p>

        <div className="flex flex-row flex-wrap gap-4">
          <TextField
            name="title"
            label="Title"
            value={searchTitle}
            onChange={setSearchTitle}
          />
          <TextField
            name="description"
            label="Description"
            value={searchDescription}
            onChange={setSearchDescription}
          />
        </div>
      </div>

      <EventList
        userType={userType}
        searchTitle={searchTitle}
        searchDescription={searchDescription}
      />
    </div>
  );
}
