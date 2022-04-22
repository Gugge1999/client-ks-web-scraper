import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiStatusDialogComponent } from '@components/api-status-dialog/api-status-dialog.component';
import { ApiStatus } from '@models/api-status.model';
import { StatusService } from '@shared/services/utils/status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  apiStatus!: ApiStatus;

  constructor(
    private dialog: MatDialog,
    private statusService: StatusService
  ) {}
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
