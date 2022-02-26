import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Watch } from 'src/app/models/watch.model';
import { WatchService } from 'src/app/services/watch.service';

import { DeleteWatchDialogComponent } from '../delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '../new-watch-dialog/new-watch-dialog.component';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent implements OnInit {
  watches$!: Observable<Watch[]>;

  constructor(
    public dialog: MatDialog,
    private watchService: WatchService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
      this.refreshData();
    }, 1 * 60000);

    this.watches$.subscribe((data) => {
      console.log(data[0]);
    });
  }

  deleteWatchDialog(watch: any) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: '350px',
      autoFocus: false,
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((res: string) => {
      if (res === 'cancelClicked') return;
      this.refreshData();
    });
  }

  toggleActiveStatus(watch: Watch) {
    this.watchService.updateActiveStatus(watch).subscribe((response) => {
      this.showSnackbar(response, 'Dismiss');
    });
  }

  openNewWatchDialog() {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      autoFocus: false,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((res: string) => {
      if (res === 'cancelClicked') return;
      this.refreshData();
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

  refreshData() {
    return (this.watches$ = this.watchService.getAllWatches());
  }
}
