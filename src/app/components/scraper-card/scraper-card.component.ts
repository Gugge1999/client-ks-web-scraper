import { Observable, Subject, takeUntil } from 'rxjs';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';
import { DeleteWatchDialogComponent } from '@components/delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '@components/new-watch-dialog/new-watch-dialog.component';
import { TimeFormats } from '@models/constants';
import { Watch } from '@models/watch.model';
import { WatchService } from '@services/watch.service';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent implements OnInit, OnDestroy {
  watches: Watch[] = [];
  isHandset$!: Observable<BreakpointState>;
  cardFormat = TimeFormats.cardFormat;

  private destroySubject$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private watchService: WatchService,
    private snackbarService: SnackbarService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);

    this.watchService
      .getAllWatches()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res) => {
        this.watches = res;
      });
  }

  deleteWatchDialog(watch: Watch, index: number) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      width: 'fit-content',
      autoFocus: false,
      data: watch,
      restoreFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res) => {
        if (res === undefined || res.click === 'cancelClicked') {
          return;
        }

        this.watches = this.watches.filter((watch) => watch.id != res.id);
        this.snackbarService.undoAndDeleteSnackbar(res, index, this.watches);
      });
  }

  toggleActiveStatus(
    watch: { isActive: boolean; label: string; id: string },
    index: number,
    event: MatSlideToggleChange
  ) {
    const oldStatus = this.watches[index].active;
    event.source.checked = oldStatus;
    this.watchService
      .toggleActiveStatus(watch)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (res) => {
          this.watches[index].active = res.isActive;
          this.snackbarService.infoSnackbar(`Toggled status on: ${res.label}`);
        },
      });
  }

  openNewWatchDialog() {
    // TODO: Byt från px till %
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      width: '700px',
      height: '425px',
      autoFocus: false,
      restoreFocus: false,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res) => {
        if (res === undefined || res === 'cancelClicked') return;

        this.watches.push(res);
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
