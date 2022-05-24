import { WatchesObj } from '@models/watches-obj.model';

export interface Watch {
  id: string;
  link: string;
  label: string;
  watches: WatchesObj;
  active: boolean;
  last_email_sent: string;
  added: string;
}
