import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackbar: MatSnackBar,
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
      this.showSnackbarDelete(res);
    });
  }

  toggleActiveStatus(watch: Watch, index: number, event: any) {
    const oldStatus = this.watches[index].active;
    event.source.checked = oldStatus;
    this.watchService.toggleActiveStatus(watch).subscribe({
      next: (res) => {
        this.watches[index].active = res.isActive;
        this.showSnackbarToggleStatus(res.label);
      },
      error: (res: HttpErrorResponse) => {
        this.showErrorSnackbar(res.error.message);
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

  showErrorSnackbar(message: string) {
    this.snackbar.open(message, 'Dismiss', {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  showSnackbarToggleStatus(message: string) {
    const snack = this.snackbar.open(
      `Toggled status on: ${message}`,
      'Dismiss',
      {
        panelClass: 'success-snackbar',
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }
    );
    // kolla vilka metoder som ska vara kvar
    snack.afterDismissed().subscribe(() => {
      console.log('This will be shown after snackbar disappeared');
    });
    snack.onAction().subscribe(() => {
      console.log('This will be called when snackbar button clicked');
    });
  }

  showSnackbarDelete(deletedWatch: Watch) {
    const snack = this.snackbar.open(
      `Deleted watch: ${deletedWatch.label}`,
      'Undo',
      {
        panelClass: ['mat-toolbar', 'mat-warn'],
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }
    );
    snack.afterDismissed().subscribe((res) => {
      // Om dismissedByAction är sant (användren klickade på Undo) ska vi inte ta bort klockan
      if (res.dismissedByAction === true) return;

      this.watchService.deleteWatch(deletedWatch.id).subscribe((res) => {
        console.log(`Deleted: ${res.deletedWatchId}`);
      });
    });
    snack.onAction().subscribe(() => {
      this.watches.push(deletedWatch);
    });
  }
}
