import { DbConfig } from '../config.ts';

export abstract class DbProvider {
  protected config: DbConfig;

  constructor(config: DbConfig) {
    this.config = config;
  }

  protected abstract get constructConnectionString(): string;
  public get connectionString(): string {
    if ('connectionString' in this.config) {
      return this.config.connectionString;
    }

    return this.constructConnectionString;
  }

  abstract init(): Promise<object>;
  abstract close(): Promise<void>;
}
