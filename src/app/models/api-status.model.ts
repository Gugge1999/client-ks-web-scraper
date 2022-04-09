import { Uptime } from '@models/uptime.model';

export interface ApiStatus {
  active: string;
  lastDatabaseBackupDate: string;
  scrapingIntervalInMinutes: number;
  uptime: Uptime;
}
