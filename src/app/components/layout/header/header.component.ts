import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiStatus } from '../../../models/api-status.model';
import { StatusService } from '../../../services/utils/status.service';
import { ApiStatusDialogComponent } from '../../api-status-dialog/api-status-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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
