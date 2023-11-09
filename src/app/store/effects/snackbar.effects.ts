import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

import { SnackbarService } from "@shared/services/snackbar/snackbar.service";
import * as watchApiActions from "@store/actions/watch-api.actions";

@Injectable()
export class SnackbarEffects {
  constructor(private actions$: Actions, private snackbarService: SnackbarService) {}

  showSuccessSnackbar$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(watchApiActions.addWatchSuccess),
        tap(({ snackbarMessage }) => this.snackbarService.successSnackbar(snackbarMessage))
      );
    },
    { dispatch: false }
  );

  showInfoSnackbar$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(watchApiActions.toggleActiveStatusSuccess),
        tap(({ snackbarMessage }) => this.snackbarService.infoSnackbar(snackbarMessage))
      );
    },
    { dispatch: false }
  );

  showErrorSnackbar$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          watchApiActions.addWatchFailure,
          watchApiActions.deleteWatchFailure,
          watchApiActions.toggleActiveStatusFailure,
          watchApiActions.loadWatchesFailure
        ),
        tap(({ snackbarMessage }) => this.snackbarService.errorSnackbar(snackbarMessage))
      );
    },
    { dispatch: false }
  );
}
