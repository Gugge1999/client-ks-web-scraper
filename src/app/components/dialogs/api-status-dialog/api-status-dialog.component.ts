import { Observable } from "rxjs";

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";
import { StatusService } from "@shared/services/utils/status.service";
import { NgIf, AsyncPipe, DecimalPipe } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-api-status-dialog",
  templateUrl: "./api-status-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./api-status-dialog.component.scss"],
  standalone: true,
  imports: [MatDialogModule, NgIf, AsyncPipe, DecimalPipe],
})
export class ApiStatusDialogComponent implements OnInit {
  apiStatus$!: Observable<ApiStatus>;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.apiStatus$ = this.statusService.getApiStatus();
  }
}
