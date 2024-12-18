import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiDialogContext } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { DatePipe } from "@angular/common";
import { cardDateFormat } from "@constants/constants";

@Component({
  selector: "scraper-notifications-dialog",
  templateUrl: "./notifications-dialog.component.html",
  styleUrl: "./notifications-dialog.component.scss",
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialogComponent {
  public readonly context = injectContext<TuiDialogContext<void, string[]>>();

  protected readonly notifications = [this.context.data].flat();

  protected readonly cardDateFormat = cardDateFormat;
}
