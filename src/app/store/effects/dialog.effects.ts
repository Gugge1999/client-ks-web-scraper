import { switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewWatchDialogComponent } from '@components/new-watch-dialog/new-watch-dialog.component';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as dialogActions from '@store/actions/dialog.actions';

@Injectable()
export class DialogEffects {
  constructor(private actions$: Actions, private readonly dialog: MatDialog) {}

  openNewWatchDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dialogActions.openNewWatchDialog),
      switchMap(() => {
        const dialogRef = this.dialog.open(NewWatchDialogComponent, {
          height: 'clamp(45ch, 50%, 50ch)',
          autoFocus: false,
          restoreFocus: false,
        });

        return dialogRef.afterClosed();
      }),
      map(() => {
        this.dialog.closeAll();

        return dialogActions.closeNewWatchDialog();
      })
    );
  });

  // closeNewWatchDialog = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(dialogActions.openNewWatchDialog),
  //     pipe(tap((t) => this.dialog.closeAll()))
  //   );
  // });
}
