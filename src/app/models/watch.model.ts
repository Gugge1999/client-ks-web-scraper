import { ScrapedWatches } from '@models/scraped-watches.model';

export interface Watch {
  id: string;
  linkToThread: string;
  label: string;
  watches: ScrapedWatches[];
  active: boolean;
  lastEmailSent?: string;
  added: string;
}
