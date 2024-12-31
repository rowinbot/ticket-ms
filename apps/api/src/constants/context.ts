import { User } from "@prisma/client";

export interface AppContext {
  readonly user: User | null;
}

export const defaultContext: AppContext = {
  user: null,
};
