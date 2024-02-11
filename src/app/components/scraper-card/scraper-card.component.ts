import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { DatePipe, NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Store } from "@ngrx/store";
import { map } from "rxjs";

import { toSignal } from "@angular/core/rxjs-interop";
import { CardActionsComponent } from "@components/card-actions/card-actions.component";
import { ProgressBarService } from "@services/progess-bar-overlay.service";
import { openNewWatchDialog } from "@store/actions/dialog.actions";

import { selectAllWatches, selectIsNewWatchLoading } from "@store/selectors/watch.selectors";

@Component({
  selector: "scraper-scraper-card",
  templateUrl: "./scraper-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./scraper-card.component.scss",
  standalone: true,
  imports: [MatCardModule, NgClass, MatButtonModule, MatTooltipModule, MatIconModule, DatePipe, CardActionsComponent],
})
export class ScraperCardComponent {
  isHandset = toSignal(this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((bs) => bs.matches)), { initialValue: false });
  watches = toSignal(this.store.select(selectAllWatches), { initialValue: [] });
  newWatchLoading = toSignal(this.store.select(selectIsNewWatchLoading), { initialValue: false });
  readonly cardDateFormat = "EEE d MMM yyyy - H:mm:ss";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    protected progressBarService: ProgressBarService,
  ) {}

  openNewWatchDialog() {
    this.store.dispatch(openNewWatchDialog());
  }
}
