import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-watch-dialog',
  templateUrl: './delete-watch-dialog.component.html',
  styleUrls: ['./delete-watch-dialog.component.scss'],
})
export class DeleteWatchDialogComponent implements OnInit {
  watchToDelete: string = 'Test watch';

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  deleteWatch(): void {
    console.log('deleteWatch() called ');
    this.showSnackbar(this.watchToDelete, 'Undo');
  }

  showSnackbar(watchToDelete: string, action: string): void {
    let snack = this._snackBar.open(`Deleted watch: ${watchToDelete}`, action, {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 5000,
    });
    snack.afterDismissed().subscribe(() => {
      console.log('This will be shown after snackbar disappeared');
    });
    snack.onAction().subscribe(() => {
      console.log('This will be called when snackbar button clicked');
    });
  }
}
