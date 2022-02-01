import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-watch-dialog',
  templateUrl: './new-watch-dialog.component.html',
  styleUrls: ['./new-watch-dialog.component.scss'],
})
export class NewWatchDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MainNavComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  saveWatch(): void {
    // TODO: save new watch.
    // If successfull: show success snackbar.
    // Else: show unsuccessful snackbar
    this.showSnackbar('Saved watch: Label');
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  showSnackbar(saveMessage: string, action?: string): void {
    let snack = this._snackBar.open(saveMessage, action, {
      panelClass: ['mat-toolbar', 'mat-primary'],
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
