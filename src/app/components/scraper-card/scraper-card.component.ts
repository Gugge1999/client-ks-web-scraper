import { Observable } from 'rxjs';

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { TimeFormats } from '@models/constants';
import { Watch } from '@models/watch.model';
import { Store } from '@ngrx/store';
import { ProgressBarService } from '@shared/services/progress-bar/progess-bar-overlay.service';
import {
  openDeleteWatchDialog,
  openNewWatchDialog,
} from '@store/actions/dialog.actions';
import { toggleActiveStatus } from '@store/actions/watch-api.actions';
import {
  selectAllWatches,
  selectIsNewWatchLoading,
} from '@store/selectors/watch.selectors';

@Component({
  selector: 'app-scraper-card',
  templateUrl: './scraper-card.component.html',
  styleUrls: ['./scraper-card.component.scss'],
})
export class ScraperCardComponent {
  protected isHandset$: Observable<BreakpointState>;
  protected watches$: Observable<Watch[]>;
  protected newWatchLoading$: Observable<boolean>;
  protected cardDateFormat = TimeFormats.cardDateFormat;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    protected progressBarService: ProgressBarService
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);
    this.watches$ = this.store.select(selectAllWatches);
    this.newWatchLoading$ = this.store.select(selectIsNewWatchLoading);
  }

  deleteWatchDialog(watch: Watch) {
    this.store.dispatch(
      openDeleteWatchDialog({
        watch,
      })
    );
  }

  toggleActiveStatus(watch: Watch) {
    this.store.dispatch(toggleActiveStatus({ watch }));
  }

  openNewWatchDialog() {
    this.store.dispatch(openNewWatchDialog());
  }
}
