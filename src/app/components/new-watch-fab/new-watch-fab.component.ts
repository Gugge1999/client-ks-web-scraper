import { Component, computed, input } from "@angular/core";
import { NewWatchDialogComponent } from "@components/new-watch-dialog/new-watch-dialog.component";
import { ApiStatus } from "@models/api-status.model";
import { Watch } from "@models/watch.model";
import { TuiButton, tuiDialog, TuiHint, TuiIcon } from "@taiga-ui/core";
import { tap } from "rxjs";

@Component({
  selector: "scraper-new-watch-fab",
  templateUrl: "./new-watch-fab.component.html",
  styleUrl: "./new-watch-fab.component.scss",
  imports: [TuiIcon, TuiButton, TuiHint],
})
export class NewWatchFabComponent {
  readonly apiStatus = input.required<ApiStatus>();
  readonly fabTooltip = computed(() => {
    switch (this.apiStatus().status) {
      case "active":
        return "";
      case "pending":
        return "Väntar på API:et";
      case "inactive":
        return "API:et är inte aktivt";
    }
  });

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

    if (cards.length === 0) {
      return;
    }

    const lastCard = cards[cards.length - 1];

    setTimeout(() => lastCard.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
}
