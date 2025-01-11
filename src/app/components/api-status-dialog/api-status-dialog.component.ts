import { Component, computed, InputSignal } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { TuiAppearance, TuiDialogContext, TuiPoint } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { TuiAxes, TuiLineChart, TuiLineChartHint } from "@taiga-ui/addon-charts";
import { TuiContext } from "@taiga-ui/cdk";
import { TuiCardLarge } from "@taiga-ui/layout";

@Component({
  selector: "scraper-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  styleUrls: ["./api-status-dialog.component.scss"],
  imports: [TuiAxes, TuiLineChart, TuiLineChartHint, TuiCardLarge, TuiAppearance],
})
export class ApiStatusDialogComponent {
  readonly dialogContext = injectContext<TuiDialogContext<void, InputSignal<ApiStatus>>>();
  private memoryUsageArr: TuiPoint[] = [];
  private memoryUsageLength = 0;

  readonly apiStatus = computed(() => this.dialogContext.data());

  readonly chartValueSig = computed(() => {
    const memoryUsage = this.apiStatus().memoryUsage;

    if (this.memoryUsageArr.length <= 20) {
      this.memoryUsageLength++;

      this.memoryUsageArr.push([this.memoryUsageArr.length, memoryUsage]);

      // OBS! Notera spread operator för att skapa ny referens
      return [...this.memoryUsageArr];
    }

    this.memoryUsageArr.splice(0, 1);

    this.memoryUsageArr.push([this.memoryUsageLength, memoryUsage]);

    this.memoryUsageLength++;

    // OBS! Notera spread operator för att skapa ny referens
    return [...this.memoryUsageArr];
  });

  readonly maxMemoryUsageSig = computed(() => Math.max(...this.chartValueSig().map(e => e[1])));

  readonly xStartValue = computed(() => this.chartValueSig()[0][0]);

  readonly axisYLabels = computed(() => [
    "0",
    (this.maxMemoryUsageSig() * 0.5).toFixed(0).toString(), // 0.5x
    this.maxMemoryUsageSig().toFixed(0).toString(), // 1x
    (this.maxMemoryUsageSig() * 1.5).toFixed(0).toString(), // 1.5x
  ]);

  /** Hittar det högsta värdet i array:en och sen lägga på 25% */
  readonly chartHeight = computed(() => this.maxMemoryUsageSig() * 1.5);

  readonly hintContent = ({ $implicit }: TuiContext<readonly TuiPoint[]>) => $implicit[0]?.[1] ?? 0;
}
