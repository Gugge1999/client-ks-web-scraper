import { Watch } from '@models/watch.model';
import { createAction, props } from '@ngrx/store';

export const openNewWatchDialog = createAction(
  '[UI Dialog] Open new watch dialog'
);

export const openDeleteWatchDialog = createAction(
  '[UI Dialog] Open delete watch dialog',
  props<{ watch: Watch }>()
);
