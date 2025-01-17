export interface Env {
  name: "prod" | "dev";
  apiUrl: "https://api-ks-web-scraper.fly.dev/api" | "http://localhost:3000/api";
  apiUrlWebSocket: "wss://api-ks-web-scraper.fly.dev/api" | "ws://localhost:3000/api";
}
