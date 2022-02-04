import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WatchService } from '../../services/watch.service';

@Component({
  selector: 'app-new-watch-dialog',
  templateUrl: './new-watch-dialog.component.html',
  styleUrls: ['./new-watch-dialog.component.scss'],
})
export class NewWatchDialogComponent implements OnInit {
  form!: FormGroup;
  label: string = '';
  uri: string = '';

  constructor(
    public dialogRef: MatDialogRef<MainNavComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private watchService: WatchService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      label: this.label,
      uri: this.uri,
    });
  }

  saveWatch(): any {
    // TODO: kolla om nått gick snett. Nu får man alltid successfull snackbar
    this.watchService
      .addNewWatch(this.form.value)
      .subscribe((response) => this.showSnackbar(response, 'Dismiss'));
    // TODO: Uppdatera sidan också också
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  showSnackbar(response: string, action?: string): void {
    let snack = this.snackBar.open(response, action, {
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
