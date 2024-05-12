import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltip } from "@angular/material/tooltip";

import { DeleteWatchDialogComponent } from "@components/dialogs/delete-watch-dialog/delete-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { SnackbarService } from "@services/snackbar.service";
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
  @Input({ required: true }) isActive!: boolean;

  private readonly dialog = inject(MatDialog);
  private readonly watchService = inject(WatchService);
  private readonly snackbarService = inject(SnackbarService);

  deleteWatchDialog(watch: Watch) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      data: watch,
      autoFocus: "dialog",
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
    const snackbar = this.snackbarService.undoSnackbar(`Raderade bevakning: ${watch.label}`);

    snackbar.afterDismissed().subscribe(async (res) => {
      if (res.dismissedByAction) {
        this.watchService.addWatch(watch);
      } else {
        this.watchService.deleteWatch(watch, true);
      }
    });
  }
}
