import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiStatusDialogComponent } from './components/api-status-dialog/api-status-dialog.component';
import { ApiStatus } from './models/api-status.model';
import { StatusService } from './services/utils/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  apiStatus!: ApiStatus;

  constructor(public dialog: MatDialog, public statusService: StatusService) {}
  ngOnInit(): void {
    this.statusService.getApiStatus().subscribe((res) => {
      this.apiStatus = res;
    });
  }

  openApiStatusDialog() {
    this.dialog.open(ApiStatusDialogComponent, {
      width: '450px',
      data: this.apiStatus,
    });
  }
}
