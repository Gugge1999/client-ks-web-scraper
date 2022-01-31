import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWatchDialogComponent } from '../delete-watch-dialog/delete-watch-dialog.component';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent implements OnInit {
  asdf: string = 'asdasd';

  isActive: string = 'toggle_off';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  deleteWatchDialog(): void {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: '375px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result kommer från form field. Tror jag...
      console.log('The dialog was closed');
    });
  }
}
