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
    this.watches$ = this.watchService.getAllWatches();

    this.watches$.subscribe((data) => {
      console.log(data);
      console.log(data[0]);
    });
  }

  deleteWatchDialog(watch: any): void {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: '375px',
      autoFocus: false,
      data: watch,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result kommer från form field. Tror jag...
      console.log(`The dialog was closed. Result: ${result}`);
      this.watches$ = this.watchService.getAllWatches();
    });
  }

  // Byt från any
  toggleIsWatchActive(watch: any): void {
    console.log(`Toggled watch. Sending to database...`);
    this.watchService.updateIsActive(watch).subscribe((response) => {
      this.showSnackbar(response, 'Dismiss');
    });
  }

  openNewWatchDialog(): void {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Result kommer från form field. Tror jag...
      console.log('result: ' + result);

      // Fixa så att timeout inte behöver användas
      // Möjliga lösningar:
      // https://www.stackoverflow.com/questions/62114022/angular-resolver-observable-completes-too-early
      // BRA TROR JAG. Anropa watchService.getAllWatches() i dialog och skicka tillbaka alla klockor till card component. https://www.stackoverflow.com/questions/51815455/how-to-pass-data-from-angular-material-dialog-to-parent-component

      // https://www.stackoverflow.com/questions/50519200/angular-6-view-is-not-updated-after-changing-a-variable-within-subscribe
      https: setTimeout(() => {
        this.watches$ = this.watchService.getAllWatches();
      }, 500);
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
}
