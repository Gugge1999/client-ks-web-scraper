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
  constructor(
    public dialogRef: MatDialogRef<MainNavComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _watchService: WatchService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      label: 'test label',
      uri: 'https://klocksnack.se/search/1613408/?q=jeager&t=post&c[child_nodes]=1&c[nodes][0]=11&c[title_only]=1&o=date',
    });
  }

  saveWatch(): any {
    this._watchService
      .addNewWatch(this.form.value)
      .subscribe((response) => this.showSnackbar(response, 'Dismiss'));
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  showSnackbar(response: string, action?: string): void {
    let snack = this._snackBar.open(response, action, {
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
