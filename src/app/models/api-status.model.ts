export interface ApiStatus {
  status: "active" | "inactive" | "pending";
  scrapingIntervalInMinutes: number;
  memoryUsage: number;
  uptime: Uptime;
}

interface Uptime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
