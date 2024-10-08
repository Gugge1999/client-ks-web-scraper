export interface Watch {
  id: string;
  watchToScrape: string;
  label: string;
  watch: ScrapedWatch;
  active: boolean;
  lastEmailSent: string | null;
  added: string;
}

export interface ScrapedWatch {
  name: string;
  postedDate: string;
  link: string;
}
