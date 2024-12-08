import { ChangeDetectionStrategy, Component, computed, InputSignal } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { TuiDialogContext } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";

@Component({
  selector: "scraper-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ApiStatusDialogComponent {
  public readonly context = injectContext<TuiDialogContext<void, InputSignal<ApiStatus>>>();

  readonly apiStatus = this.context.data;
  private readonly memoryUsageArr: string[] = [];

  hejsan = computed(() => {
    const memoryUsage = this.apiStatus().memoryUsage;

    if (this.memoryUsageArr.length < 10) {
      this.memoryUsageArr.push(memoryUsage);
      return this.memoryUsageArr;
    }

    this.memoryUsageArr.shift();

    this.memoryUsageArr.push(memoryUsage);

    return this.memoryUsageArr;
  });
}
