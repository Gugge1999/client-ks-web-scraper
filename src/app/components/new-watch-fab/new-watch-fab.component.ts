import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { ApiStatus } from "@models/api-status.model";
import { Watch } from "@models/watch.model";
import { TuiButton, tuiDialog, TuiHint, TuiIcon } from "@taiga-ui/core";
import { tap } from "rxjs";

@Component({
  selector: "scraper-new-watch-fab",
  templateUrl: "./new-watch-fab.component.html",
  styleUrl: "./new-watch-fab.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiIcon, TuiButton, TuiHint],
})
export class NewWatchFabComponent {
  apiStatus = input.required<ApiStatus>();
  fabTooltip = computed(() => (this.apiStatus().active ? "" : "API:et är inte aktivt"));

  private readonly dialog = tuiDialog(NewWatchDialogComponent, { size: "s", closeable: false });

  async openNewWatchDialog() {
    this.dialog()
      .pipe(tap(res => this.handleFabRes(res)))
      .subscribe();
  }

  private handleFabRes(res: Watch | undefined) {
    if (res === undefined) {
      return;
    }

    const cards = document.querySelectorAll(".card");
    const lastCard = cards[cards.length - 1];
    // setTimeout behövs för mobil, annars hamnar man lite för långt upp
    setTimeout(() => lastCard.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
}
