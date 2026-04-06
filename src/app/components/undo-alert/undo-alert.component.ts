import { TuiPortalContext } from "@taiga-ui/cdk";
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from "@angular/core";
import { WatchApiService } from "@services/watch-api.service";
import { TuiButton, type TuiNotificationOptions } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { take } from "rxjs";

@Component({
  selector: "scraper-undo-alert",
  imports: [TuiButton],
  templateUrl: "./undo-alert.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UndoAlertComponent implements OnDestroy {
  protected readonly context = injectContext<TuiPortalContext<TuiNotificationOptions<string>, boolean>>();
  protected readonly watchApiService = inject(WatchApiService);
  private undoClicked = false;

  ngOnDestroy(): void {
    if (this.undoClicked) {
      return;
    }

    const id = this.context.data;
    this.watchApiService.deleteWatchById(id).pipe(take(1)).subscribe();
  }

  onUndoClicked() {
    this.undoClicked = true;
  }
}
