import { of, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { WatchService } from "@services/watch.service";
import * as watchApiActions from "@store/actions/watch-api.actions";

@Injectable()
export class WatchEffects {
  constructor(private actions$: Actions, private watchService: WatchService) {}

  loadWatches$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.loadWatches),
      switchMap(() => {
        return this.watchService.getAllWatches().pipe(
          map((watches) => {
            return watchApiActions.loadWatchesSuccess({ watches: watches });
          }),
          catchError((error) => of(watchApiActions.loadWatchesFailure({ snackbarMessage: error })))
        );
      })
    );
  });

  addWatch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.addWatch),
      switchMap((action) => {
        return this.watchService.addNewWatch(action.newWatch).pipe(
          map((watch) => {
            return watchApiActions.addWatchSuccess({
              snackbarMessage: `Added watch with label: ${watch.label}`,
              newWatch: watch,
            });
          }),
          catchError((error: string) => {
            return of(watchApiActions.addWatchFailure({ snackbarMessage: error }));
          })
        );
      })
    );
  });

  deleteWatchById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.deleteWatch),
      switchMap((action) => {
        return this.watchService.deleteWatchById(action.watch.id).pipe(
          map((id) => {
            return watchApiActions.deleteWatchSuccess({
              watchId: id.deletedWatchId,
            });
          }),
          catchError((err: string) =>
            of(
              watchApiActions.deleteWatchFailure({
                snackbarMessage: err,
                watch: action.watch,
              })
            )
          )
        );
      })
    );
  });

  toggleActiveStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(watchApiActions.toggleActiveStatus),
      switchMap((action) => {
        return this.watchService.toggleActiveStatus(action.watch).pipe(
          map((updatedWatch) => {
            return watchApiActions.toggleActiveStatusSuccess({
              snackbarMessage: `Toggled status on: ${updatedWatch.label}`,
              watchProps: {
                id: updatedWatch.id,
                active: updatedWatch.active,
                label: updatedWatch.label,
              },
            });
          }),
          catchError((err: string) => {
            return of(
              watchApiActions.toggleActiveStatusFailure({
                snackbarMessage: err,
                watchProps: {
                  id: action.watch.id,
                  active: action.watch.active,
                  label: action.watch.label,
                },
              })
            );
          })
        );
      })
    );
  });
}
