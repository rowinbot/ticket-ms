import "@testing-library/jest-dom/vitest";

import { test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "~tests/test-utils";

import { EventList } from "./event-list";
import { EventDTO, EventUserType } from "@ticket-ms/types/events";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const mockLocalEvent: EventDTO = {
  id: 1,
  title: "1 Event",
  description: "Test Description",
  dateISO: new Date().toISOString(),
  location: "Test Location",
  shortDescription: "Test Short Description",
  userType: EventUserType.local,
};

const mockTouristEvent: EventDTO = {
  id: 2,
  title: "2 Event",
  dateISO: new Date().toISOString(),
  location: "Test Location",
  shortDescription: "Test Short Description",
  userType: EventUserType.tourist,
};

const mockEvents: EventDTO[] = [mockLocalEvent, mockTouristEvent];

const server = setupServer(
  // capture "GET /greeting" requests
  http.get("/api/events", ({ request }) => {
    const url = new URL(request.url);
    const userType = url.searchParams.get("userType");

    return HttpResponse.json(
      mockEvents.filter((e) => e.userType === userType) as EventDTO[],
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads the list correctly and updates when changing user type or search", async () => {
  const { rerender } = render(
    <EventList
      searchDescription=""
      searchTitle=""
      userType={EventUserType.local}
    />,
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  rerender(
    <EventList
      searchDescription=""
      searchTitle=""
      userType={EventUserType.tourist}
    />,
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("loads the list correctly and updates when changing user type or search", async () => {
  const { rerender } = render(
    <EventList
      searchDescription=""
      searchTitle=""
      userType={EventUserType.local}
    />,
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(screen.getByText(mockLocalEvent.title)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  rerender(
    <EventList
      searchDescription=""
      searchTitle=""
      userType={EventUserType.tourist}
    />,
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(screen.queryAllByText(mockLocalEvent.title)).not.toHaveLength(1); // starts at 0
  expect(screen.getByText(mockTouristEvent.title)).toBeInTheDocument();
});
