import { Fragment, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { EventUserType } from "@ticket-ms/types/events";

import { fetchEvents } from "./events.service";
import { clsx } from "~/utils/clsx";
import { EventCard } from "./event-item/event-card";
import { EventRow } from "./event-item/event-row";

const pageSize = 30;

export function EventList({
  userType,
  searchTitle,
  searchDescription,
}: {
  userType: EventUserType;
  searchTitle: string;
  searchDescription: string;
}) {
  const controlElementRef = useRef<HTMLLIElement>(null);

  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["events", userType, searchTitle, searchDescription] as const,
    queryFn: fetchEvents,
    initialPageParam: {
      cursor: 0,
      pageSize,
      userType,
      searchTitle,
      searchDescription,
    },
    getNextPageParam: (_, __, lastPageParam) => ({
      cursor: lastPageParam.cursor + pageSize,
      pageSize,
      userType,
      searchTitle,
      searchDescription,
    }),
  });

  useEffect(() => {
    const element = controlElementRef.current;
    if (!element || isLoading) return;

    const listener: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          fetchNextPage({ cancelRefetch: false });
        }
      }
    };

    const observer = new IntersectionObserver(listener, {
      rootMargin: "0px",
      threshold: 1.0,
    });

    observer.observe(element);
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [fetchNextPage, isLoading]);

  const listClassName = useMemo(() => {
    // Intentionally keeping this as a mutable variable to benefit
    // from IDE's Tailwind auto-complete without having to hack it.
    // - they could've been early returns but...
    let className: string;

    switch (userType) {
      case EventUserType.local:
        className =
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
        break;
      case EventUserType.tourist:
      default:
        className = "flex flex-col";
        break;
    }

    return className;
  }, [userType]);

  const EventItemComponent = useMemo(() => {
    switch (userType) {
      case EventUserType.local:
        return EventCard;
      case EventUserType.tourist:
      default:
        return EventRow;
    }
  }, [userType]);

  // TODO: Implement virtualization to render longer lists effortlessly:
  // - https://tanstack.com/virtual/latest/docs/introduction has TypeScript support but limited responsive handling
  // - https://github.com/bvaughn/react-virtualized comes from a React core team member but has no TypeScript support
  // ... find any other alternative.
  return (
    <div className="py-4">
      <ul className={clsx("gap-2 sm:gap-4", listClassName)}>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((event) => (
              <EventItemComponent key={event.id} event={event} />
            ))}
          </Fragment>
        ))}

        <li ref={controlElementRef}></li>
      </ul>

      {isFetching && <div>Loading...</div>}
    </div>
  );
}
