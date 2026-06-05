import { Component, computed, inject, input } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { Watch } from "@models/watch.model";
import { TuiButton, TuiDialogService, TuiHint, TuiIcon } from "@taiga-ui/core";
import { NotificationService } from "../../services/notification.service";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { NewWatchDialogComponent } from "@components/new-watch-dialog/new-watch-dialog.component";
import { tap } from "rxjs";
import { BreakpointObserverService } from "@services/breakpoint-observer.service";

@Component({
  selector: "scraper-new-watch-fab",
  imports: [TuiIcon, TuiButton, TuiHint],
  templateUrl: "./new-watch-fab.component.html",
  styleUrl: "./new-watch-fab.component.scss",
})
export class NewWatchFabComponent {
  readonly apiStatus = input.required<ApiStatus>();

  private readonly alertService = inject(NotificationService);
  private readonly dialogService = inject(TuiDialogService);
  private readonly breakpointObserverService = inject(BreakpointObserverService);
  private readonly appearanceDialogString = this.breakpointObserverService.appearanceDialogString;

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
        this.alertService.errorNotification(errMsg);
        throw Error(errMsg);
      }
    }
  });

  async openNewWatchDialog() {
    this.dialogService
      .open<Watch | undefined>(new PolymorpheusComponent(NewWatchDialogComponent), {
        size: "s",
        appearance: this.appearanceDialogString(),
        closable: false,
      })
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
