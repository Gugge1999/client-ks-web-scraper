import { Env } from "@models/env";

// noinspection JSUnusedGlobalSymbols
export const env: Env = {
  name: "prod",
  apiUrl: "https://api-ks-web-scraper.fly.dev/api",
  apiUrlWebSocket: "wss://api-ks-web-scraper.fly.dev/api",
} as const;
