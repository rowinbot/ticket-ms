import { EnvVars } from "./env.ts";

export type DbConfig =
  | {
      connectionString: string;
      db: string;
    }
  | {
      host: string;
      port: string;
      user: string;
      pass: string;
      db: string;
    };

/**
 * The app configuration.
 *
 * Do not pass directly to controllers, rather pass the specific config
 * each service needs.
 */
export interface AppConfig {
  port: number;
  enabledOrigins: (string | RegExp)[];
  db: DbConfig;
}

const ENABLED_ORIGINS: AppConfig["enabledOrigins"] = [/localhost/i];

export function getAppConfig(envVars: EnvVars): AppConfig {
  const extraOrigin = envVars.get("ORIGIN");

  return {
    port: envVars.getNumber("PORT") ?? 3000,
    enabledOrigins:
      extraOrigin && !ENABLED_ORIGINS.includes(extraOrigin)
        ? ENABLED_ORIGINS.concat(extraOrigin!)
        : ENABLED_ORIGINS,
    db: getDbConfig(envVars),
  };
}

function getDbConfig(envVars: EnvVars): DbConfig {
  const dbUrl = envVars.get("DATABASE_URL");

  if (dbUrl) {
    return {
      connectionString: dbUrl,
      db: envVars.getRequired("DATABASE_NAME"),
    };
  }

  return {
    host: envVars.getRequired("DATABASE_HOST"),
    port: envVars.getRequired("DATABASE_PORT"),
    user: envVars.getRequired("DATABASE_USER"),
    pass: envVars.getRequired("DATABASE_PASS"),
    db: envVars.getRequired("DATABASE_NAME"),
  };
}
