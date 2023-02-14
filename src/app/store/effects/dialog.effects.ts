import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWatchDialogComponent } from '@components/dialogs/delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '@components/dialogs/new-watch-dialog/new-watch-dialog.component';
import { Watch } from '@models/watch.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';
import * as dialogActions from '@store/actions/dialog.actions';
import * as watchApiActions from '@store/actions/watch-api.actions';
import * as watchActions from '@store/actions/watch.actions';

@Injectable()
export class DialogEffects {
  constructor(
    private actions$: Actions,
    private readonly dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  openNewWatchDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(dialogActions.openNewWatchDialog),
        tap(() =>
          this.dialog.open(NewWatchDialogComponent, {
            height: 'clamp(45ch, 50%, 50ch)',
            autoFocus: false,
            restoreFocus: false,
          })
        )
      );
    },
    { dispatch: false }
  );

  closeNewWatchDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          watchApiActions.addWatchSuccess,
          watchApiActions.addWatchFailure,
          watchApiActions.deleteWatchSuccess,
          watchApiActions.deleteWatchFailure
        ),
        tap(() => this.dialog.closeAll())
      );
    },
    { dispatch: false }
  );

  openDeleteWatchDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dialogActions.openDeleteWatchDialog),
      switchMap(({ watch }) => {
        const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
          width: 'fit-content',
          autoFocus: false,
          data: watch,
          restoreFocus: false,
        });
        return dialogRef.afterClosed();
      }),
      map((res: Watch | { click: string } | undefined) => {
        if (res === undefined || 'click' in res) {
          return watchActions.noOp();
        } else {
          this.snackbarService.undoAndDeleteSnackbar(res);

          return watchActions.deleteWatch({ watchId: res.id });
        }
      })
    );
  });
}