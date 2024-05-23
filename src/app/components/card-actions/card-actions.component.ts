import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltip } from "@angular/material/tooltip";

import { DeleteWatchDialogComponent } from "@components/dialogs/delete-watch-dialog/delete-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { SnackBarService } from "@services/snack-bar.service";
import { WatchService } from "@services/watch.service";
import { firstValueFrom, map } from "rxjs";

@Component({
  selector: "scraper-card-actions",
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, MatTooltip, MatButtonModule, MatCardActions, FormsModule],
  templateUrl: "./card-actions.component.html",
  styleUrl: "./card-actions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActionsComponent {
  @Input({ required: true }) watch!: Watch;
  @Input({ required: true }) isActive!: boolean;

  private readonly dialog = inject(MatDialog);
  private readonly watchService = inject(WatchService);
  private readonly snackbarService = inject(SnackBarService);

  deleteWatchDialog(watch: Watch) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      data: watch,
      autoFocus: "dialog",
    });

    // TODO: Byt till await?
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

  private async deleteSnackbarWithUndoAction(watch: Watch) {
    const snackbar = this.snackbarService.undoSnackBar(`Raderade bevakning: ${watch.label}`);

    const dismissedByAction = await firstValueFrom(snackbar.afterDismissed().pipe(map((res) => res.dismissedByAction)));

    dismissedByAction ? this.watchService.addWatch(watch) : this.watchService.deleteWatch(watch, true);
  }
}
