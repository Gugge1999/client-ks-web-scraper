import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { Watch } from "@models/watch.model";
import { AppComponent } from "app/app.component";

@Component({
  selector: "scraper-delete-watch-dialog",
  templateUrl: "./delete-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./delete-watch-dialog.component.scss",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteWatchDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<AppComponent>);
  protected readonly watchToDelete: Watch = inject(MAT_DIALOG_DATA);

  cancelClicked() {
    this.dialogRef.close();
  }

  deleteWatch(watchToDelete: Watch) {
    this.dialogRef.close(watchToDelete);
  }
}
