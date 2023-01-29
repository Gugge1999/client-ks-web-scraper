import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WatchService } from '@services/watch.service';
import { ProgressBarService } from '@shared/services/progress-bar/progess-bar-overlay.service';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';
import * as watchApiActions from '@store/actions/watch-api.actions';

@Injectable()
export class WatchEffects {
  constructor(
    private actions$: Actions,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    private progressBarService: ProgressBarService
  ) {}

  loadWatches$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.loadWatches),
      switchMap(() =>
        this.watchService.getAllWatches().pipe(
          map((watches) => {
            return watchApiActions.loadWatchesSuccess({ watches: watches });
          }),
          catchError((error) =>
            of(watchApiActions.loadWatchesFailure({ error }))
          )
        )
      )
    );
  });

  addWatch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.addWatch),
      switchMap((action) => {
        return this.watchService.addNewWatch(action.newWatch).pipe(
          map((watch) => {
            action.dialogRef.close();
            this.snackbarService.successSnackbar(
              `Added watch with label: ${watch.label}`
            );

            return watchApiActions.addWatchSuccess({
              newWatch: watch,
            });
          }),
          catchError((error) => {
            console.log(`Error from addNewWatch function: ${error}`);
            action.dialogRef.close();
            this.progressBarService.hide();

            return of(watchApiActions.addWatchFailure({ error }));
          })
        );
      })
    );
  });

  deleteWatchById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.deleteWatchById),
      switchMap((action) =>
        this.watchService.deleteWatch(action.watchId).pipe(
          map((id) => {
            return watchApiActions.deleteWatchByIdSuccess({
              watchId: id.deletedWatchId,
            });
          }),
          catchError((error) =>
            of(watchApiActions.deleteWatchByIdFailure({ error }))
          )
        )
      )
    );
  });

  toggleActiveStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.toggleActiveStatus),
      switchMap((action) =>
        this.watchService.toggleActiveStatus(action.watch).pipe(
          map((updatedWatch) => {
            this.snackbarService.infoSnackbar(
              `Toggled status on: ${updatedWatch.label}`
            );

            return watchApiActions.toggleActiveStatusSuccess({
              id: updatedWatch.id,
              active: updatedWatch.active,
              label: updatedWatch.label,
            });
          }),
          catchError((error) => {
            this.snackbarService.errorSnackbar(
              'Could not toggle active status'
            );

            return of(watchApiActions.toggleActiveStatusFailure({ error }));
          })
        )
      )
    );
  });
}
