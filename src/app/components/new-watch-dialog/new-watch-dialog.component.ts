import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WatchService } from '../../services/watch.service';
import { MainNavComponent } from '../main-nav/main-nav.component';

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
    private snackbar: MatSnackBar,
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
    this.watchService.addNewWatch(this.form.value).subscribe((response) => {
      console.log('addNewWatch done.');

      this.showSnackbar(response, 'Dismiss');
    });
    // TODO: Uppdatera sidan också också

    // Från github: Vad är tap? Importerad från rxjs
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  showSnackbar(response: string, action?: string): void {
    let snack = this.snackbar.open(response, action, {
      panelClass: 'success-snackbar',
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    snack.afterDismissed().subscribe(() => {
      console.log('This will be shown after snackbar disappeared');
    });
    snack.onAction().subscribe(() => {
      console.log('This will be called when snackbar button clicked');
    });
  }
}
