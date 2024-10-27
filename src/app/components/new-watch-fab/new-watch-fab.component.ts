import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { tap } from "rxjs";
import { NewWatchDialogComponent } from "@components/dialogs/new-watch-dialog/new-watch-dialog.component";
import { TuiButton, tuiDialog, TuiHint, TuiIcon } from "@taiga-ui/core";
import { ApiStatus } from "@models/api-status.model";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-new-watch-fab",
  standalone: true,
  templateUrl: "./new-watch-fab.component.html",
  styleUrl: "./new-watch-fab.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton, TuiIcon, TuiHint],
})
export class NewWatchFabComponent {
  apiStatus = input.required<ApiStatus>();
  tooltip = computed(() => (this.apiStatus().active === false ? "API:et är inte aktivt" : ""));

  private readonly dialog = tuiDialog(NewWatchDialogComponent, { size: "s", closeable: false });

  async openNewWatchDialog() {
    this.dialog()
      .pipe(tap(res => this.handleRes(res)))
      .subscribe();
  }

  private handleRes(res: Watch | undefined) {
    if (res === undefined) {
      return;
    }

    // TODO: Det hamnar lite för långt upp på mobil
    const cards = document.querySelectorAll(".card");
    const lastCard = cards[cards.length - 1];
    lastCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
