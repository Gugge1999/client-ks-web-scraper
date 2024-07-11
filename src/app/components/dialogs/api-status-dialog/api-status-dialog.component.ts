import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatDialogModule } from "@angular/material/dialog";

import { StatusService } from "@services/status.service";

@Component({
  selector: "scraper-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./api-status-dialog.component.scss",
  standalone: true,
  imports: [MatDialogModule],
})
export class ApiStatusDialogComponent {
  private readonly statusService = inject(StatusService);

  apiStatus = toSignal(this.statusService.getApiStatus());
}
