import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltip } from "@angular/material/tooltip";

import { DeleteWatchDialogComponent } from "@components/dialogs/delete-watch-dialog/delete-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-card-actions",
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, MatTooltip, MatButtonModule, MatCardActions, MatCheckboxModule, FormsModule],
  templateUrl: "./card-actions.component.html",
  styleUrl: "./card-actions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActionsComponent {
  @Input({ required: true }) watch!: Watch;

  constructor(
    private readonly dialog: MatDialog,
    private readonly watchService: WatchService,
    private readonly snackbar: MatSnackBar,
  ) {}

  deleteWatchDialog(watch: Watch) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((watch: Watch | undefined) => {
      if (watch === undefined) {
        return;
      }

      this.watchService.deleteWatch(watch, false);

      this.deleteSnackbarWithUndoAction(watch);
    });
  }

  toggleActiveStatus(watch: Watch) {
    this.watchService.toggleActiveStatus(watch);
  }

  private deleteSnackbarWithUndoAction(watch: Watch) {
    const snackbar = this.snackbar.open(`Deleted watch: ${watch.label}`, "Undo", {
      panelClass: ["snackbar-warning"],
    });

    snackbar.afterDismissed().subscribe(async (res) => {
      if (res.dismissedByAction) {
        this.watchService.addWatch(watch);
      } else {
        this.watchService.deleteWatch(watch);
      }
    });
  }
}
