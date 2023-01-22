import { ScrapedWatches } from '@app/models/scraped-watches.model';

export interface Watch {
  id: string;
  linkToThread: string;
  label: string;
  watches: ScrapedWatches[];
  active: boolean;
  last_email_sent: string;
  added: string;
}
