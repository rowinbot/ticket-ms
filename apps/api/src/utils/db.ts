import { LazyDbProviderContainer } from "./db/lazy-container.ts";
import { SqliteProvider } from "./db/sqlite.provider.ts";

export const GlobalDB = new LazyDbProviderContainer(SqliteProvider);
