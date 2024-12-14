export interface Env {
  name: "prod" | "dev";
  apiUrl: "https://api-ks-web-scraper.fly.dev/api" | "http://192.168.1.2:3000/api";
  apiUrlWebSocket: "wss://api-ks-web-scraper.fly.dev/api" | "ws://192.168.1.2:3000/api";
}
