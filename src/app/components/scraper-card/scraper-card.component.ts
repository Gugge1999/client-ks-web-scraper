import { Watch } from 'src/app/models/watch.model';
import { WatchService } from 'src/app/services/watch.service';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
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
  watches!: Watch[];
  cardWidth!: string;

  hide: boolean = false;
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
          ? (this.cardWidth = 'smallWidthCard')
          : (this.cardWidth = 'fullWidthCard');
      });

    this.watchService.getAllWatches().subscribe((res) => {
      this.watches = res;
    });
  }

  deleteWatchDialog(watch: any) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: '350px',
      autoFocus: false,
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === 'cancelClicked') return;
      this.watches = this.watches.filter((watch) => watch.id != res.id);
    });
  }

  toggleActiveStatus(watch: Watch) {
    this.watchService.updateActiveStatus(watch).subscribe((res) => {
      this.showSnackbar(res, 'Dismiss');
    });
  }

  openNewWatchDialog() {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      height: '335px',
      autoFocus: false,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === 'cancelClicked') return;
      this.watches.push(res);
    });
  }

  showSnackbar(response: string, action?: string) {
    let snack = this.snackbar.open(response, action, {
      panelClass: 'success-snackbar',
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    snack.afterDismissed().subscribe(() => {
      console.log('This will be shown after snackbar disappeared');
    });
    snack.onAction().subscribe(() => {
      console.log('This will be called when snackbar button clicked');
    });
  }
}
