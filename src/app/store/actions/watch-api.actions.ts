import { MatDialogRef } from '@angular/material/dialog';
import { WatchFormDTO } from '@models/DTOs/watch-form-dto';
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
    newWatch: WatchFormDTO;
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

export const deleteWatchById = createAction(
  '[Watch API] Delete watch by id',
  props<{ watchId: string }>()
);

export const deleteWatchByIdSuccess = createAction(
  '[Watch API] Delete watches by id success',
  props<{ watchId: string }>()
);

export const deleteWatchByIdFailure = createAction(
  '[Watch API] Delete watch by id failure',
  props<{ error: string }>()
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
  props<{ error: string }>()
);
