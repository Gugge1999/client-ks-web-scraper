import { DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatDialogModule } from "@angular/material/dialog";

import { StatusService } from "@shared/services/utils/status.service";

@Component({
  selector: "ks-scraper-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./api-status-dialog.component.scss",
  standalone: true,
  imports: [MatDialogModule, DecimalPipe],
})
export class ApiStatusDialogComponent {
  apiStatus = toSignal(this.statusService.getApiStatus());

  constructor(private statusService: StatusService) {}
}
