import { DbProvider } from "./common.ts";
import { Prisma, PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";
import { DefaultArgs } from "@prisma/client/runtime/library";

/**
 * Type definition for the PrismaClient instance received when using "$transaction" callback.
 */
export type TransactionalDB = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$transaction" | "$connect" | "$disconnect" | "$on" | "$use" | "$extends"
>;
export class SqliteProvider extends DbProvider {
  protected db: PrismaClient | undefined;

  protected get constructConnectionString(): string {
    invariant("host" in this.config, "Missing required db config: host");
    return `postgresql://${this.config.user}:${this.config.pass}@${this.config.host}/${this.config.db}`;
  }

  async init() {
    if (this.db !== undefined) {
      return this.db;
    }

    const prisma = new PrismaClient();

    this.db = prisma;
    await this.db.$connect();

    return this.db;
  }

  async close() {
    invariant(
      this.db !== undefined,
      "Unable to close DB client as it's not initialized",
    );
    await this.db.$disconnect();

    this.db = undefined;
  }
}
