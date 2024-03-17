import { DatePipe, NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

import { CardActionsComponent } from "@components/card-actions/card-actions.component";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-scraper-card",
  templateUrl: "./scraper-card.component.html",
  styleUrl: "./scraper-card.component.scss",
  standalone: true,
  imports: [MatCardModule, NgClass, MatButtonModule, MatTooltipModule, MatIconModule, DatePipe, CardActionsComponent],
})
export class ScraperCardComponent implements OnInit {
  watches = this.watchService.watches;
  readonly cardDateFormat = "EEE d MMM yyyy - H:mm:ss";

  constructor(
    private watchService: WatchService,
    private dialog: MatDialog,
  ) {}

  async ngOnInit() {
    this.watchService.getAllWatches();
  }

  toggleActiveStatus(watch: Watch) {
    this.watchService.toggleActiveStatus(watch);
  }

  openNewWatchDialog() {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      height: "clamp(45ch, 50%, 50ch)",
      restoreFocus: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res: Watch | undefined) => {
      if (res !== undefined) {
        const cards = document.querySelectorAll(".card");
        const lastCard = cards[cards.length - 1];
        lastCard.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}
