import { map, switchMap, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiStatusDialogComponent } from "@components/dialogs/api-status-dialog/api-status-dialog.component";
import { DeleteWatchDialogComponent } from "@components/dialogs/delete-watch-dialog/delete-watch-dialog.component";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SnackbarService } from "@shared/services/snackbar/snackbar.service";
import * as dialogActions from "@store/actions/dialog.actions";
import * as watchApiActions from "@store/actions/watch-api.actions";
import * as watchActions from "@store/actions/watch.actions";

@Injectable()
export class DialogEffects {
  constructor(private actions$: Actions, private dialog: MatDialog, private snackbarService: SnackbarService) {}

  openNewWatchDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(dialogActions.openNewWatchDialog),
        tap(() => {
          console.log("qiowjdoijqwd");

          return this.dialog.open(NewWatchDialogComponent, {
            height: "clamp(45ch, 50%, 50ch)",

            /*
                TODO:
                @breaking-change
                14.0.0 Remove boolean option from autoFocus. Use string or AutoFocusTarget instead.
              */
            autoFocus: false,
            restoreFocus: false,
          });
        })
      );
    },
    { dispatch: false }
  );

  closeNewWatchDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(watchApiActions.addWatch),
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
          autoFocus: false,
          data: watch,
          restoreFocus: false,
        });
        return dialogRef.afterClosed();
      }),
      map((res: Watch) => {
        if (res === undefined) {
          return dialogActions.closeDialog();
        }

        this.snackbarService.undoAndDeleteSnackbar(res);

        return watchActions.deleteWatch({ watchId: res.id });
      })
    );
  });

  openApiStatusDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(dialogActions.openApiStatusDialog),
        tap(() => {
          return this.dialog.open(ApiStatusDialogComponent, {
            width: "450px",
            autoFocus: false,
            restoreFocus: false,
          });
        })
      );
    },
    { dispatch: false }
  );
}
