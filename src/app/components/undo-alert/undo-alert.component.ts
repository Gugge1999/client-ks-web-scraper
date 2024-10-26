import { ChangeDetectionStrategy, Component, inject, OnDestroy } from "@angular/core";
import { WatchApiService } from "@services/watch-api.service";
import { TuiPopover } from "@taiga-ui/cdk/services";
import { TuiAlertOptions, TuiButton } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { take } from "rxjs";

@Component({
  selector: "scraper-undo-alert",
  standalone: true,
  templateUrl: "./undo-alert.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton],
})
export class UndoAlertComponent implements OnDestroy {
  protected readonly context = injectContext<TuiPopover<TuiAlertOptions<string>, boolean>>();
  protected readonly watchApiService = inject(WatchApiService);
  undoClicked = false;

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
