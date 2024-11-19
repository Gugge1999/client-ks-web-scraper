export interface ApiStatus {
  active: boolean;
  scrapingIntervalInMinutes: number;
  memoryUsage: string;
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
