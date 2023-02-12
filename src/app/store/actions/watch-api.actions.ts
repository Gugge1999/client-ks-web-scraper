import { MatDialogRef } from '@angular/material/dialog';
import { NewWatchFormDTO } from '@models/DTOs/new-watch-form-dto';
import { Watch } from '@models/watch.model';
import { createAction, props } from '@ngrx/store';

export const loadWatches = createAction('[Watch API] Load watches from API');

export const loadWatchesSuccess = createAction(
  '[Watch API] Load watches success',
  props<{ watches: Watch[] }>()
);

export const loadWatchesFailure = createAction(
  '[Watch API] Load watches failure',
  props<{ error: string }>()
);

export const addWatch = createAction(
  '[Watch API] Add watch API',
  props<{
    newWatch: NewWatchFormDTO;
    dialogRef: MatDialogRef<any, any>;
  }>()
);

export const addWatchSuccess = createAction(
  '[Watch API] Add watch API success',
  props<{ newWatch: Watch }>()
);

export const addWatchFailure = createAction(
  '[Watch API] Load watches API failure',
  props<{ error: string }>()
);

export const deleteWatch = createAction(
  '[Watch API] Delete watch ',
  props<{ watch: Watch }>()
);

export const deleteWatchSuccess = createAction(
  '[Watch API] Delete watches success',
  props<{ watchId: string }>()
);

export const deleteWatchFailure = createAction(
  '[Watch API] Delete watch failure',
  props<{ watch: Watch }>()
);

export const toggleActiveStatus = createAction(
  '[Watch API] Toggle active status',
  props<{ watch: Watch }>()
);

export const toggleActiveStatusSuccess = createAction(
  '[Watch API] Toggle active status success',
  props<{ id: string; active: boolean; label: string }>()
);

export const toggleActiveStatusFailure = createAction(
  '[Watch API] Toggle active status failure',
  props<{ id: string; active: boolean; label: string }>()
);
