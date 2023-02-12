import { createAction } from '@ngrx/store';

export const openNewWatchDialog = createAction(
  '[UI Dialog] Open new watch dialog'
);

export const closeNewWatchDialog = createAction(
  '[UI Dialog] Close new watch dialog'
);

export const newWatchDialogResult = createAction(
  '[UI Dialog] Result new watch dialog'
);
