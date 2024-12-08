import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiDialogContext, tuiFormatNumber, TuiHint } from "@taiga-ui/core";
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
  public readonly context = injectContext<TuiDialogContext<void, string[]>>();

  // TODO: Byt till horisontella notiser
  notifications = [this.context.data].flat().map(m => m.substring(0, 9));

  protected readonly valueTest = [[1000, 8000, 4000, 3000, 4000]];

  protected readonly hint = ({ $implicit }: TuiContext<number>) => {
    return this.valueTest.reduce((result, set) => `${result}$${tuiFormatNumber(set[$implicit] ?? 0)}\n`, "").trim();
  };
}
