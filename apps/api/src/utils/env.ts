import dotenv from "dotenv";
import { expand } from "dotenv-expand";
import fs from "fs";

/**
 * Do not use this class directly other than in setup or main files.
 * -> Use app config instead.
 */
export class EnvVars {
  values: Record<string, string> = {};

  constructor() {
    const instance = EnvVars.#singleton;

    if (!instance) {
      // Only load envs once.
      this.#loadEnv();
      return this;
    }

    return instance;
  }

  static get #dotenvFilePath(): string {
    return ".env";
  }

  get(name: string): string | null {
    return process.env[name] ?? this.values[name] ?? null;
  }

  getRequired(name: string): string {
    const value = this.get(name);

    if (value === null) {
      throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
  }

  getNumber(name: string): number | null {
    const value = this.get(name);

    return typeof value === "string" ? +value : null;
  }

  getRequiredNumber(name: string): number {
    const value = this.getNumber(name);

    if (value === null) {
      throw new Error(`Missing required environment variable: ${name}`);
    }

    if (isNaN(value)) {
      throw new Error(`Invalid number for environment variable: ${name}`);
    }

    return value;
  }

  #loadEnv(): void {
    try {
      if (!fs.existsSync(EnvVars.#dotenvFilePath)) {
        throw new Error(
          `Missing .env file. Please create one at ${EnvVars.#dotenvFilePath}`,
        );
      }

      const envs = dotenv.config({ path: EnvVars.#dotenvFilePath });
      expand(envs);

      if (envs.error) {
        throw envs.error;
      }

      this.values = envs.parsed ?? {};
    } catch (err) {
      console.error(err);
      console.log(
        "Couldn't load dotenv file, defaulting to environment variables.",
      );
      this.values = process.env as Record<string, string>;
    }
  }

  static setup(): EnvVars {
    return new EnvVars();
  }

  static #singleton: EnvVars | null = null;
}

/**
 * @returns The current environment the app is running in.
 */
export function isProductionEnv(): boolean {
  return process.env.NODE_ENV == "production";
}
