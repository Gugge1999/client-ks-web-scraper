import { Uptime } from './uptime.model';

export interface ApiStatus {
  active: string;
  lastDatabaseBackupDate: string;
  scrapingIntervalInMinutes: number;
  uptime: Uptime;
}
