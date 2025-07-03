import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiDialogContext } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { DatePipe } from "@angular/common";
import { CARD_DATE_FORMAT_LEADING_ZERO } from "@constants/constants";

@Component({
  selector: "scraper-notifications-dialog",
  imports: [DatePipe],
  templateUrl: "./notifications-dialog.component.html",
  styleUrl: "./notifications-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialogComponent {
  public readonly context = injectContext<TuiDialogContext<void, { label: string; notifications: string[] }>>();

  protected readonly notifications = [this.context.data.notifications].flat();

  protected readonly cardDateFormat = CARD_DATE_FORMAT_LEADING_ZERO;
}
