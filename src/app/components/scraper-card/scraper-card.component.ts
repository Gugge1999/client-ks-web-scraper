import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { DatePipe, NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { map } from "rxjs";

import { MatDialog } from "@angular/material/dialog";
import { CardActionsComponent } from "@components/card-actions/card-actions.component";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { ProgressBarService } from "@services/progess-bar-overlay.service";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-scraper-card",
  templateUrl: "./scraper-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./scraper-card.component.scss",
  standalone: true,
  imports: [MatCardModule, NgClass, MatButtonModule, MatTooltipModule, MatIconModule, DatePipe, CardActionsComponent],
})
export class ScraperCardComponent implements OnInit {
  isHandset = toSignal(this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((bs) => bs.matches)), { initialValue: false });
  watches = this.watchService.watches;
  readonly cardDateFormat = "EEE d MMM yyyy - H:mm:ss";

  constructor(
    private breakpointObserver: BreakpointObserver,
    protected progressBarService: ProgressBarService,
    private watchService: WatchService,
    private dialog: MatDialog,
  ) {
    effect(() => {
      console.log("The current count is:", this.watches());
    });
  }

  async ngOnInit() {
    this.watchService.getAllWatches();
  }

  toggleActiveStatus(watch: Watch) {
    this.watchService.toggleActiveStatus(watch);
  }

  openNewWatchDialog() {
    this.dialog.open(NewWatchDialogComponent, {
      height: "clamp(45ch, 50%, 50ch)",
      restoreFocus: false,
    });
  }
}
