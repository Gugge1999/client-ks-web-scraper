import { ScrapedWatches } from "@models/scraped-watches.model";

export interface Watch {
  id: string;
  watchToScrape: string;
  label: string;
  watches: ScrapedWatches[];
  active: boolean;
  lastEmailSent?: Date;
  added: Date;
}
