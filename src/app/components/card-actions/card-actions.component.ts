import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltip } from "@angular/material/tooltip";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeleteWatchDialogComponent } from "@components/dialogs/delete-watch-dialog/delete-watch-dialog.component";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-card-actions",
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, MatTooltip, MatButtonModule, MatCardActions],
  templateUrl: "./card-actions.component.html",
  styleUrl: "./card-actions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActionsComponent implements OnChanges {
  @Input({ required: true }) watch!: Watch;

  constructor(
    private dialog: MatDialog,
    private watchService: WatchService,
    private snackbar: MatSnackBar,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes", changes);
  }

  deleteWatchDialog(watch: Watch) {
    const dialogRef = this.dialog.open(DeleteWatchDialogComponent, {
      data: watch,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((res: Watch | undefined) => {
      if (res === undefined) {
        return;
      }

      this.watchService.deleteWatch(watch, false);

      this.deleteSnackbarWithUndoAction(res);
    });
  }

  toggleActiveStatus(watch: Watch) {
    this.watchService.toggleActiveStatus(watch);
  }

  private deleteSnackbarWithUndoAction(watch: Watch) {
    const snackbar = this.snackbar.open(`Deleted watch: ${watch.label}`, "Undo", {
      panelClass: ["snackbar-warning"],
    });

    // TODO: Behöver man köra unsubscribe på snackbar ???
    snackbar.afterDismissed().subscribe(async (res) => {
      if (res.dismissedByAction) {
        this.watchService.addWatch(watch);
      } else {
        this.watchService.deleteWatch(watch);
      }
    });
  }
}
