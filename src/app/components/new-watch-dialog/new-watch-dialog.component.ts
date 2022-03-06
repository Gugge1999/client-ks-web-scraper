import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WatchService } from '../../services/watch.service';
import { ScraperCardComponent } from '../scraper-card/scraper-card.component';

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
    public dialogRef: MatDialogRef<ScraperCardComponent>,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private watchService: WatchService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      label: this.label,
      uri: this.uri,
    });
  }

  saveWatch() {
    // Validering : https://angular.io/guide/form-validation
    this.watchService.addNewWatch(this.form.value).subscribe((response) => {
      this.showSnackbar(response, 'Dismiss');
      this.dialogRef.close(response);
    });
  }

  showSnackbar(response: string, action?: string) {
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
