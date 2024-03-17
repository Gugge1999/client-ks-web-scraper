import { Watch } from "@models/watch.model";

export interface NewWatchFormDTO {
  label: string;
  watchToScrape: string;
}

export interface ValidationError {
  errorMessage: string;
}
