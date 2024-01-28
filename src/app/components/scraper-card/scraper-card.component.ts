import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { AsyncPipe, DatePipe, NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { Watch } from "@models/watch.model";
import { ProgressBarService } from "@shared/services/progress-bar/progess-bar-overlay.service";
import { openDeleteWatchDialog, openNewWatchDialog } from "@store/actions/dialog.actions";
import { toggleActiveStatus } from "@store/actions/watch-api.actions";
import { selectAllWatches, selectIsNewWatchLoading } from "@store/selectors/watch.selectors";

@Component({
  selector: "ks-scraper-scraper-card",
  templateUrl: "./scraper-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./scraper-card.component.scss",
  standalone: true,
  imports: [MatCardModule, NgClass, MatExpansionModule, MatButtonModule, MatTooltipModule, MatIconModule, MatSlideToggleModule, AsyncPipe, DatePipe],
})
export class ScraperCardComponent {
  protected isHandset$: Observable<BreakpointState>;
  protected watches$: Observable<Watch[]>;
  protected newWatchLoading$: Observable<boolean>;
  protected readonly cardDateFormat = "EEE d MMM yyyy - H:mm:ss";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    protected progressBarService: ProgressBarService,
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);
    this.watches$ = this.store.select(selectAllWatches);
    this.newWatchLoading$ = this.store.select(selectIsNewWatchLoading);
  }

  deleteWatchDialog(watch: Watch) {
    this.store.dispatch(
      openDeleteWatchDialog({
        watch,
      }),
    );
  }

  toggleActiveStatus(watch: Watch) {
    this.store.dispatch(toggleActiveStatus({ watch }));
  }

  openNewWatchDialog() {
    this.store.dispatch(openNewWatchDialog());
  }
}
