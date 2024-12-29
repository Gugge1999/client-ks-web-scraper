import { Component, computed, inject, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UndoAlertComponent } from "@components/undo-alert/undo-alert.component";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";
import { TuiAlertService, tuiDialog, TuiDialogService, TuiHint, TuiIcon } from "@taiga-ui/core";
import { TUI_CONFIRM, TuiBadge, TuiBadgedContent, TuiConfirmData, TuiSwitch } from "@taiga-ui/kit";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { take, tap } from "rxjs";
import { NotificationsDialogComponent } from "@components/notifications-dialog/notifications-dialog.component";

@Component({
  selector: "scraper-bevakningar-card-actions",
  templateUrl: "./bevakningar-card-actions.component.html",
  styleUrl: "./bevakningar-card-actions.component.scss",
  imports: [FormsModule, TuiSwitch, TuiIcon, TuiHint, TuiBadgedContent, TuiBadge],
})
export class BevakningarCardActionsComponent {
  readonly watch = input.required<Watch>();
  readonly notifications = computed(() => this.watch().notifications);
  readonly numberOfNotifications = computed(() => this.notifications().length);

  public readonly watchService = inject(WatchService);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly dialog = tuiDialog(NotificationsDialogComponent, {
    label: `Notiser för bevakning`,
    size: "auto",
  });

  toggleActiveStatus(watch: Watch) {
    return this.watchService.toggleActiveStatus(watch);
  }

  showNotifications() {
    this.dialog(this.notifications()).subscribe();
  }

  protected deleteWatch(): void {
    const data: TuiConfirmData = {
      no: "Avbryt",
      yes: "Radera",
      appearance: "secondary-destructive",
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: `Vill du radera bevakning: ${this.watch().label}?`,
        size: "auto",
        data: data,
      })
      .pipe(
        tap(deleteAgreed => (deleteAgreed ? this.deleteWatchWithUndoAlert() : null)),
        take(1),
      )
      .subscribe();
  }

  protected deleteWatchWithUndoAlert() {
    /** OBS: Anrop för att radera bevakningen från db görs i {@link UndoAlertComponent} */
    this.watchService.deleteWatch(this.watch());

    this.alerts
      .open(new PolymorpheusComponent(UndoAlertComponent), {
        label: `Raderade: ${this.watch().label}`,
        appearance: "info",
        data: this.watch().id,
      })
      .pipe(tap(() => this.watchService.addWatch(this.watch())))
      .subscribe();
  }
}
