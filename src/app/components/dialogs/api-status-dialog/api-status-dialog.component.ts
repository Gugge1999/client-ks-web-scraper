import { AsyncPipe, DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { ApiStatus } from "@models/api-status.model";
import { StatusService } from "@shared/services/utils/status.service";

@Component({
  selector: "app-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./api-status-dialog.component.scss",
  standalone: true,
  imports: [MatDialogModule, DecimalPipe, AsyncPipe],
})
export class ApiStatusDialogComponent implements OnInit {
  apiStatus$!: Observable<ApiStatus>;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.apiStatus$ = this.statusService.getApiStatus();
  }
}
