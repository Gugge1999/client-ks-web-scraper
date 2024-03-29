import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { ScraperCardComponent } from "@components/scraper-container/scraper-container.component";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-delete-watch-dialog",
  templateUrl: "./delete-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./delete-watch-dialog.component.scss",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteWatchDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ScraperCardComponent>);
  protected readonly watchToDelete: Watch = inject(MAT_DIALOG_DATA);

  cancelClicked(): void {
    this.dialogRef.close();
  }

  deleteWatch(watchToDelete: Watch): void {
    this.dialogRef.close(watchToDelete);
  }
}
