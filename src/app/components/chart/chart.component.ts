import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiPoint } from "@taiga-ui/core";
import { TuiContext } from "@taiga-ui/cdk";
import { TuiAxes, TuiLineChart, TuiLineChartHint } from "@taiga-ui/addon-charts";

@Component({
  selector: "scraper-chart",
  imports: [TuiAxes, TuiLineChartHint, TuiLineChart],
  templateUrl: "./chart.component.html",
  styleUrl: "./chart.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  protected readonly value: readonly TuiPoint[] = [
    [20, 180],
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
  ];

  protected readonly axisYLabels: string[] = ["0", "50", "100", "150", "200"];

  protected readonly hintContent = ({ $implicit }: TuiContext<readonly TuiPoint[]>): number => $implicit[0]?.[1] ?? 0;

  protected readonly stringify = String;
}
