import { Uptime } from '@models/uptime.model';

export interface ApiStatus {
  active: boolean;
  scrapingIntervalInMinutes: number;
  uptime: Uptime;
}
