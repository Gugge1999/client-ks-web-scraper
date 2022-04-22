import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DeleteWatchDialogComponent } from '@components/delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '@components/new-watch-dialog/new-watch-dialog.component';
import { Watch } from '@models/watch.model';
import { WatchService } from '@services/watch.service';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent implements OnInit {
  watches!: Watch[];
  cardWidth!: string;

  constructor(
    private dialog: MatDialog,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    private breakpointObserver: BreakpointObserver
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
      height: '175px',
      autoFocus: false,
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'cancelClicked') return;
      this.watches = this.watches.filter((watch) => watch.id != res.id);
      this.snackbarService.undoAndDeleteSnackbar(res, this.watches);
    });
  }

  toggleActiveStatus(
    watch: { isActive: boolean; label: string; id: string },
    index: number,
    event: MatSlideToggleChange
  ) {
    const oldStatus = this.watches[index].active;
    event.source.checked = oldStatus;
    this.watchService.toggleActiveStatus(watch).subscribe({
      next: (res) => {
        this.watches[index].active = res.isActive;
        this.snackbarService.successSnackbar(`Toggled status on: ${res.label}`);
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
    dialogRef.afterClosed().subscribe((res) => {
      if (res === undefined || res === 'cancelClicked') return;

      this.watches.push(res);
    });
  }
}
