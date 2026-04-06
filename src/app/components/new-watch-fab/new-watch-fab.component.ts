import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { Watch } from "@models/watch.model";
import { TuiButton, TuiDialogService, TuiHint, TuiIcon } from "@taiga-ui/core";
import { AlertService } from "@services/alert.service";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { NewWatchDialogComponent } from "@components/new-watch-dialog/new-watch-dialog.component";
import { tap } from "rxjs";

@Component({
  selector: "scraper-new-watch-fab",
  imports: [TuiIcon, TuiButton, TuiHint],
  templateUrl: "./new-watch-fab.component.html",
  styleUrl: "./new-watch-fab.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewWatchFabComponent {
  readonly apiStatus = input.required<ApiStatus>();

  private readonly alertService = inject(AlertService);
  private readonly dialogService = inject(TuiDialogService);

  readonly fabTooltip = computed(() => {
    switch (this.apiStatus().status) {
      case "active":
        return "";
      case "pending":
        return "Väntar på API:et";
      case "inactive":
        return "API:et är inte aktivt";
      default: {
        const errMsg = "Okänd API status";
        this.alertService.errorAlert(errMsg);
        throw Error(errMsg);
      }
    }
  });

  async openNewWatchDialog() {
    this.dialogService
      .open<Watch | undefined>(new PolymorpheusComponent(NewWatchDialogComponent), { size: "s", closable: false })
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
