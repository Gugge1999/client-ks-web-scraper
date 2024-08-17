import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { firstValueFrom, map } from "rxjs";

import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-new-watch-fab",
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: "./new-watch-fab.component.html",
  styleUrl: "./new-watch-fab.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewWatchFabComponent {
  private readonly matDialog = inject(MatDialog);

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
