import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { Watch } from "@angular/core/primitives/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { firstValueFrom, map } from "rxjs";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatButtonModule, MatTooltipModule, MatIconModule, SummaryComponent, CardComponent],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly watchService = inject(WatchService);
  private readonly matDialog = inject(MatDialog);

  watches = this.watchService.watches;

  ngOnInit() {
    this.themeService.initTheme();

    this.watchService.getAllWatches();
  }

  async openNewWatchDialog() {
    const dialogRef = this.matDialog.open(NewWatchDialogComponent, { height: "clamp(45ch, 50%, 50ch)", autoFocus: false });

    const watch = await firstValueFrom(dialogRef.afterClosed().pipe(map((watch: Watch | undefined) => watch)));

    if (watch === undefined) {
      return;
    }

    const cards = document.querySelectorAll(".card");
    const lastCard = cards[cards.length - 1];
    lastCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
