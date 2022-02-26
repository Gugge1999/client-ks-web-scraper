import { Observable } from 'rxjs';
import { WatchService } from 'src/app/services/watch.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DeleteWatchDialogComponent } from '../delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '../new-watch-dialog/new-watch-dialog.component';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent implements OnInit {
  // TODO: Byt från any. Se hur de är gjort:
  // https://github.com/Jon-Peppinck/angular-node-mysql-crud/blob/5cd06316d18bf94f236edee302fc68770d3984f2/frontend/src/app/components/grocery-list/grocery-list.component.ts
  watches$!: Observable<any[]>;

  constructor(
    public dialog: MatDialog,
    private watchService: WatchService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refreshData();
    setInterval(() => {
      this.refreshData();
    }, 1 * 60000);

    this.watches$.subscribe((data) => {
      console.log(data[0]);
    });
  }

  deleteWatchDialog(watch: any): void {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: '350px',
      autoFocus: false,
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'cancelClicked') return;
      this.refreshData();
    });
  }

  // Byt från any
  toggleActiveStatus(watch: any): void {
    console.log(`Toggled watch. Sending to database...`);
    this.watchService.updateActiveStatus(watch).subscribe((response) => {
      this.showSnackbar(response, 'Dismiss');
    });
  }

  openNewWatchDialog(): void {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      autoFocus: false,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'cancelClicked') return;
      this.refreshData();
    });
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

  refreshData() {
    this.watches$ = this.watchService.getAllWatches();
  }
}
