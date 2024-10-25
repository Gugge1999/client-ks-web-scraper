import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { TuiDialogContext } from "@taiga-ui/core";
import { injectContext } from "@taiga-ui/polymorpheus";

@Component({
  selector: "scraper-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./api-status-dialog.component.scss",
  standalone: true,
  imports: [],
})
export class ApiStatusDialogComponent {
  public readonly context = injectContext<TuiDialogContext<void, ApiStatus>>();

  readonly apiStatus = this.context.data;
}
