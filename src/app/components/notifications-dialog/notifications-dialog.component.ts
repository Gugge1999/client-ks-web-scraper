import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiDialogContext } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { DatePipe } from "@angular/common";
import { CARD_DATE_FORMAT } from "@constants/constants";

@Component({
  selector: "scraper-notifications-dialog",
  templateUrl: "./notifications-dialog.component.html",
  styleUrl: "./notifications-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
})
export class NotificationsDialogComponent {
  public readonly context = injectContext<TuiDialogContext<void, { label: string; notifications: string[] }>>();

  protected readonly notifications = [this.context.data.notifications].flat();

  protected readonly cardDateFormat = CARD_DATE_FORMAT;
}
