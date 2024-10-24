import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { Watch } from "@models/watch.model";
import { SnackBarService } from "@services/snack-bar.service";
import { WatchService } from "@services/watch.service";
import { TuiHint } from "@taiga-ui/core";
import { TuiSwitch } from "@taiga-ui/kit";
import { firstValueFrom, map } from "rxjs";

@Component({
  selector: "scraper-card-actions",
  standalone: true,
  templateUrl: "./card-actions.component.html",
  styleUrl: "./card-actions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatTooltip, MatButtonModule, MatCardActions, FormsModule, TuiSwitch, TuiHint],
})
export class CardActionsComponent {
  watch = input.required<Watch>();
  isActive = input.required<boolean>();

  public readonly dialog = inject(MatDialog);
  public readonly watchService = inject(WatchService);
  public readonly snackbarService = inject(SnackBarService);

  async deleteWatch(watch: Watch) {
    this.watchService.deleteWatch(watch, false);
    this.deleteSnackbarWithUndoAction(watch);
  }

  toggleActiveStatus(watch: Watch) {
    this.watchService.toggleActiveStatus(watch);
  }

  private async deleteSnackbarWithUndoAction(watch: Watch) {
    const snackbar = this.snackbarService.undoSnackBar(`Raderade bevakning: ${watch.label}`);

    const dismissedByAction = await firstValueFrom(snackbar.afterDismissed().pipe(map(res => res.dismissedByAction)));

    if (dismissedByAction) {
      this.watchService.addWatch(watch);
      return;
    }

    this.watchService.deleteWatch(watch, true);
  }
}
