import { Uptime } from '@models/uptime.model';

export interface ApiStatus {
  active: string;
  scrapingIntervalInMinutes: number;
  uptime: Uptime;
}
