import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiDialogContext, tuiFormatNumber, TuiHint, TuiPoint } from "@taiga-ui/core";
import { TuiContext } from "@taiga-ui/cdk";
import { TuiAxes, TuiBarChart } from "@taiga-ui/addon-charts";
import { injectContext } from "@taiga-ui/polymorpheus";

@Component({
  selector: "scraper-notifications-notifications-chart",
  templateUrl: "./notifications-chart.component.html",
  styleUrl: "./notifications-chart.component.scss",
  imports: [TuiAxes, TuiBarChart, TuiHint],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsChartComponent {
  public readonly context = injectContext<TuiDialogContext<void, Date[]>>();

  notifications = [this.context.data];

  protected readonly valueTest = [
    [1000, 8000, 4000, 3000, 4000],
    [6000, 2000, 4500, 7000, 5000],
  ];

  protected readonly labelsX = ["Jan 2021", "Feb", "Mar", "Apr", "May"];
  protected readonly labelsY = ["0", "10 000"];

  protected readonly hint = ({ $implicit }: TuiContext<number>) => {
    return this.valueTest.reduce((result, set) => `${result}$${tuiFormatNumber(set[$implicit] ?? 0)}\n`, "").trim();
  };

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
