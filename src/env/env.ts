// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `env.ts` with `env.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Env } from "@models/env";

export const env: Env = {
  name: "prod",
  apiUrl: "https://api-ks-web-scraper.fly.dev/api",
  apiUrlWebSocket: "wss://api-ks-web-scraper.fly.dev/api",
} as const;
