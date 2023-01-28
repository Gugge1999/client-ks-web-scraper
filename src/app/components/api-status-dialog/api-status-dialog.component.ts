import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ApiStatus } from '@models/api-status.model';
import { StatusService } from '@shared/services/utils/status.service';

@Component({
  selector: 'app-api-status-dialog',
  templateUrl: './api-status-dialog.component.html',
  styleUrls: ['./api-status-dialog.component.scss'],
})
export class ApiStatusDialogComponent implements OnInit {
  apiStatus$!: Observable<ApiStatus>;

  constructor(private readonly statusService: StatusService) {}

  ngOnInit(): void {
    this.apiStatus$ = this.statusService.getApiStatus();
  }
}
