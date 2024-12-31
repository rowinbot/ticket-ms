import { FormattedEvent } from "../events.service";

export type EventItemComponent = React.FC<{
  event: FormattedEvent;
}>;
