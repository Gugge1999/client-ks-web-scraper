import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WatchService } from 'src/app/services/watch.service';
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
  watches!: any[];

  constructor(public dialog: MatDialog, private watchService: WatchService) {}

  ngOnInit(): void {
    this.watchService.getAllWatches().subscribe((response) => {
      this.watches = response;
    });
  }

  deleteWatchDialog(): void {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: '375px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result kommer från form field. Tror jag...
      console.log(`The dialog was closed. Result: ${result}`);
    });
  }

  toggleIsWatchActive(index: number, active: string, id: string): void {
    this.watches[index].active = active === 'true' ? 'false' : 'true';
    console.log('Toggle active value: ' + this.watches[index].active);
    // TODO: skicka till backend och skapa en snackbar
  }

  test: string = 'test string';

  openNewWatchDialog(): void {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      autoFocus: false,
    });
  }
}
