import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, map } from "rxjs";

import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { TuiButton, TuiHint, TuiIcon } from "@taiga-ui/core";

@Component({
  selector: "scraper-new-watch-fab",
  standalone: true,
  templateUrl: "./new-watch-fab.component.html",
  styleUrl: "./new-watch-fab.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton, TuiIcon, TuiHint],
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
