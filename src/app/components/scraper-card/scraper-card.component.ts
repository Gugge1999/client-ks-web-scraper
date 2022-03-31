import { SnackbarService } from 'src/app/services/snackbar.service';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Watch } from '../../models/watch.model';
import { WatchService } from '../../services/watch.service';
import { DeleteWatchDialogComponent } from '../delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '../new-watch-dialog/new-watch-dialog.component';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent implements OnInit {
  watches!: Watch[];
  cardWidth!: string;

  constructor(
    public dialog: MatDialog,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        state.matches
          ? (this.cardWidth = 'small-card-width')
          : (this.cardWidth = 'full-card-width');
      });

    this.watchService.getAllWatches().subscribe((res) => {
      this.watches = res;
    });
  }

  deleteWatchDialog(watch: Watch) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: '375px',
      autoFocus: false,
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === 'cancelClicked') return;
      this.watches = this.watches.filter((watch) => watch.id != res.id);
      this.snackbarService.showSnackbarDelete(res, this.watches);
    });
  }

  toggleActiveStatus(watch: Watch, index: number, event: any) {
    const oldStatus = this.watches[index].active;
    event.source.checked = oldStatus;
    this.watchService.toggleActiveStatus(watch).subscribe({
      next: (res) => {
        this.watches[index].active = res.isActive;
        this.snackbarService.openSuccessSnackbar(
          `Toggled status on: ${res.label}`
        );
      },
      error: (res: HttpErrorResponse) => {
        this.snackbarService.openErrorSnackbar(res.error.message);
      },
    });
  }

  openNewWatchDialog() {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      height: '350px',
      autoFocus: false,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === undefined || res === 'cancelClicked') return;

      this.watches.push(res);
    });
  }
}
