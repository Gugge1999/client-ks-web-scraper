import { ApiStatus } from 'src/app/models/api-status.model';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-api-status-dialog',
  templateUrl: './api-status-dialog.component.html',
  styleUrls: ['./api-status-dialog.component.scss'],
})
export class ApiStatusDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public apiStatus: ApiStatus) {}
}
