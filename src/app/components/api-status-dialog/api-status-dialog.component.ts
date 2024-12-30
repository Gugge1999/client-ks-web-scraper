import { Component, computed, effect, InputSignal } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { TuiDialogContext, TuiPoint } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { TuiAxes, TuiLineChart, TuiLineChartHint } from "@taiga-ui/addon-charts";
import { TuiContext } from "@taiga-ui/cdk";

@Component({
  selector: "scraper-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  styleUrls: ["./api-status-dialog.component.scss"],
  imports: [TuiAxes, TuiLineChart, TuiLineChartHint],
})
export class ApiStatusDialogComponent {
  readonly context = injectContext<TuiDialogContext<void, InputSignal<ApiStatus>>>();
  readonly apiStatus = computed(() => this.context.data());
  // TODO: Den ska egentligen var av typen TuiPoint[] men det är readonly
  private memoryUsageArr: [number, number][] = [];
  private memoryUsageLength = 0;

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

    // OBS: Notera spread operator för att skapa ny referens
    return [
      ...this.memoryUsageArr.map((elem, index) => {
        elem[0] = index;

        return elem;
      }),
    ];
  });

  readonly stringify = String;

  constructor() {
    effect(() => {
      console.log(this.chartValueSig());
    });
  }

  readonly averageMemoryUsageSig = computed(() => {
    return (
      this.chartValueSig()
        .map(e => e[1])
        .reduce((a, b) => a + b) / this.chartValueSig().length
    );
  });

  readonly maxMemoryUsageSig = computed(() => Math.max(...this.chartValueSig().map(e => e[1])));

  readonly axisYLabels = computed(() => [
    "0",
    (this.maxMemoryUsageSig() * 0.5).toFixed(0).toString(), // 0.5x
    this.maxMemoryUsageSig().toFixed(0).toString(), // 1x
    (this.maxMemoryUsageSig() * 1.5).toFixed(0).toString(), // 1.5x
  ]);

  /** Hittar det högsta värdet i array:en och sen lägga på 25% */
  readonly chartHeight = computed(() => this.maxMemoryUsageSig() * 1.25);

  readonly hintContent = ({ $implicit }: TuiContext<readonly TuiPoint[]>) => $implicit[0]?.[1] ?? 0;
}
