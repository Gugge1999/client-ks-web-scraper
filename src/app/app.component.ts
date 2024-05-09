import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { Watch } from "@angular/core/primitives/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CardComponent } from "@components/card/card.component";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";

import { FooterComponent } from "@components/footer/footer.component";
import { HeaderComponent } from "@components/header/header.component";
import { SummaryComponent } from "@components/summary/summary.component";
import { ThemeService } from "@services/theme.service";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatButtonModule, MatTooltipModule, MatIconModule, SummaryComponent, CardComponent],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  private readonly watchService = inject(WatchService);
  private readonly dialog = inject(MatDialog);

  watches = this.watchService.watches;

  async ngOnInit() {
    console.time("stopwatch");

    this.themeService.initTheme();

    this.watchService.getAllWatches();
    console.timeEnd("stopwatch");
  }

  openNewWatchDialog() {
    const dialogRef = this.dialog.open(NewWatchDialogComponent, {
      height: "clamp(45ch, 50%, 50ch)",
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res: Watch | undefined) => {
      if (res !== undefined) {
        const cards = document.querySelectorAll(".card");
        const lastCard = cards[cards.length - 1];
        lastCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}
