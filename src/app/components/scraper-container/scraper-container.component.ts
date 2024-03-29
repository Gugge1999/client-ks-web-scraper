import { DatePipe, NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

import { CardComponent } from "@components/card/card.component";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { SummaryComponent } from "@components/summary/summary.component";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-scraper-container",
  templateUrl: "./scraper-container.component.html",
  styleUrl: "./scraper-container.component.scss",
  standalone: true,
  imports: [NgClass, MatButtonModule, MatTooltipModule, MatIconModule, DatePipe, SummaryComponent, CardComponent],
})
export class ScraperCardComponent implements OnInit {
  watches = this.watchService.watches;

  constructor(
    private watchService: WatchService,
    private dialog: MatDialog,
  ) {}

  async ngOnInit() {
    this.watchService.getAllWatches();
  }

  openNewWatchDialog() {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      height: "clamp(45ch, 50%, 50ch)",
      restoreFocus: false,
      autoFocus: "first-tabbable",
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
