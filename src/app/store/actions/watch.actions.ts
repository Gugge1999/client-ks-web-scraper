import { Watch } from '@models/watch.model';
import { createAction, props } from '@ngrx/store';

export const addWatch = createAction(
  '[Watch] Add watch',
  props<{ watch: Watch }>()
);

export const deleteWatch = createAction(
  '[Watch] Delete watch',
  props<{ watchId: string }>()
);
