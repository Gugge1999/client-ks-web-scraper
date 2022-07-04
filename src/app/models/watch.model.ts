import { ScrapedWatches } from '@app/models/scraped-watches.model';

export interface Watch {
  id: string;
  link: string;
  label: string;
  watches: ScrapedWatches[];
  active: boolean;
  last_email_sent: string;
  added: string;
}
