import http from "http";
import { getAppConfig } from "./utils/config.ts";
import { EnvVars } from "./utils/env.ts";
import { createApp, setupApp } from "./app.ts";

async function main() {
  const app = createApp();
  const server = http.createServer(app);

  const envVars = EnvVars.setup();
  const appConfig = getAppConfig(envVars);

  setupApp(server, app, appConfig);

  server.listen(appConfig.port, () => {
    console.log(`Server started on port ${appConfig.port}`);
    console.log(`> http://localhost:${appConfig.port}`);
  });
}

main();
