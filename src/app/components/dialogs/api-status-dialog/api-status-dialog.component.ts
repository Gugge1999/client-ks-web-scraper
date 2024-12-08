import { ChangeDetectionStrategy, Component, computed, InputSignal, OnInit } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { TuiDialogContext, TuiPoint } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { TuiAxes, TuiLineChart, TuiLineChartHint } from "@taiga-ui/addon-charts";
import { TuiContext } from "@taiga-ui/cdk";

@Component({
  selector: "scraper-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  styleUrls: ["./api-status-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiAxes, TuiLineChart, TuiLineChartHint],
})
export class ApiStatusDialogComponent implements OnInit {
  public readonly context = injectContext<TuiDialogContext<void, InputSignal<ApiStatus>>>();

  readonly apiStatus = this.context.data;
  private readonly memoryUsageArr: TuiPoint[] = [];
  private memoryUsageLength = 0;

  readonly hejsan = computed(() => {
    const memoryUsage = this.apiStatus().memoryUsage;

    if (this.memoryUsageArr.length <= 9) {
      this.memoryUsageLength++;

      this.memoryUsageArr.push([this.memoryUsageArr.length, memoryUsage]);
      return this.memoryUsageArr;
    }

    this.memoryUsageArr.shift();

    // TODO: Den här skippar nr 10
    this.memoryUsageLength++;

    this.memoryUsageArr.push([this.memoryUsageLength, memoryUsage]);

    console.log("memoryUsageArr", this.memoryUsageArr);
    console.log("value", this.value);

    return this.memoryUsageArr;
  });

  readonly value: TuiPoint[] = [
    [0, 100],
    [1, 180],
    [2, 50],
    [3, 75],
    [4, 50],
    [5, 150],
    [6, 175],
    [7, 190],
    [8, 70],
    [9, 70],
  ];

  readonly stringify = String;

  readonly axisXLabels: string[] = this.value.map(e => e[0].toString()).slice(1);

  readonly axisXLabelsSig = computed(() =>
    this.hejsan()
      .map(e => e[0].toString())
      .slice(1),
  );

  readonly averageMemoryUsage = this.value.map(e => e[1]).reduce((a, b) => a + b) / this.value.length;
  readonly averageMemoryUsageSig = computed(
    () =>
      this.hejsan()
        .map(e => e[1])
        .reduce((a, b) => a + b) / this.hejsan().length,
  );

  readonly axisYLabels: readonly string[] = [
    "0",
    (this.averageMemoryUsage * 0.5).toFixed(0).toString(), // Halva av medel
    this.averageMemoryUsage.toFixed(0).toString(), // Medel
    (this.averageMemoryUsage * 1.5).toFixed(0).toString(), // Halva över medel
  ];

  readonly axisYLabelsSig = computed(() => {
    return [
      "0",
      (this.averageMemoryUsageSig() * 0.5).toFixed(0).toString(), // Halva av medel
      this.averageMemoryUsageSig().toFixed(0).toString(), // Medel
      (this.averageMemoryUsageSig() * 1.5).toFixed(0).toString(), // Halva över medel
    ];
  });

  ngOnInit(): void {
    console.log("averageMemoryUsage", this.averageMemoryUsage);
    console.log("axisXLabels", this.axisXLabels);

    this.axisXLabels.push(this.value.length.toString());
  }

  readonly hintContent = ({ $implicit }: TuiContext<readonly TuiPoint[]>) => $implicit[0]?.[1] ?? 0;
}
