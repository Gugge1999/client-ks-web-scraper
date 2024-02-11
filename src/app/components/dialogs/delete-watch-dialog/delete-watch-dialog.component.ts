import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { ScraperCardComponent } from "@components/scraper-card/scraper-card.component";
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public watchToDelete: Watch,
    private dialogRef: MatDialogRef<ScraperCardComponent>,
  ) {}

  cancelClicked(): void {
    this.dialogRef.close();
  }

  deleteWatch(watchToDelete: Watch): void {
    this.dialogRef.close(watchToDelete);
  }
}
