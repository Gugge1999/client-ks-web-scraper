import { Env } from "@models/env";

export const env: Env = {
  name: "prod",
  apiUrl: "https://api-ks-web-scraper.fly.dev/api",
  apiUrlWebSocket: "wss://api-ks-web-scraper.fly.dev/api",
} as const satisfies Record<string, string>;
