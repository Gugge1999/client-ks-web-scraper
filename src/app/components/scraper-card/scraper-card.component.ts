import { Observable } from 'rxjs';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWatchDialogComponent } from '@components/delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '@components/new-watch-dialog/new-watch-dialog.component';
import { TimeFormats } from '@models/constants';
import { Watch } from '@models/watch.model';
import { Store } from '@ngrx/store';
import { ProgressBarService } from '@shared/services/progress-bar/progess-bar-overlay.service';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';
import { toggleActiveStatus } from '@store/actions/watch-api.actions';
import { deleteWatch } from '@store/actions/watch.actions';
import {
  selectAllWatches,
  selectNewWatchLoading
} from '@store/selectors/watch.selectors';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent implements OnInit {
  protected isHandset$!: Observable<BreakpointState>;
  protected watches$!: Observable<Watch[]>;
  protected cardDateFormat = TimeFormats.cardFormat;
  protected newWatchLoading$!: Observable<boolean>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    protected readonly progressBarService: ProgressBarService
  ) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);
    this.watches$ = this.store.select(selectAllWatches);
    this.newWatchLoading$ = this.store.select(selectNewWatchLoading);
  }

  deleteWatchDialog(watch: Watch) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: 'fit-content',
      autoFocus: false,
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === undefined || res.click === 'cancelClicked') {
        return;
      }

      this.store.dispatch(deleteWatch({ watchId: watch.id }));

      this.snackbarService.undoAndDeleteSnackbar(watch);
    });
  }

  toggleActiveStatus(watch: Watch) {
    this.store.dispatch(toggleActiveStatus({ watch }));
  }

  openNewWatchDialog() {
    // TODO: Byt från px till %
    this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      height: '425px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
