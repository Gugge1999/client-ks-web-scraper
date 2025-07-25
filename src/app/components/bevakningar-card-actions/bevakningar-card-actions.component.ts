import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
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
  imports: [FormsModule, TuiSwitch, TuiIcon, TuiHint, TuiBadgedContent, TuiBadge],
  templateUrl: "./bevakningar-card-actions.component.html",
  styleUrl: "./bevakningar-card-actions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BevakningarCardActionsComponent {
  public readonly watch = input.required<Watch>();
  /** `active` behöver vara en egen input för `OnPush` */
  public readonly active = input.required<boolean>();

  private readonly notifications = computed(() => this.watch().notifications);
  protected readonly numberOfNotifications = computed(() => this.notifications().length);
  protected readonly numberOfNotificationsIconColor = computed(() =>
    this.numberOfNotifications() > 0 ? "var(--tui-status-positive)" : "var(--tui-text-secondary)",
  );

  private readonly watchService = inject(WatchService);
  private readonly alertsService = inject(TuiAlertService);
  private readonly dialogsService = inject(TuiDialogService);
  private readonly dialog = tuiDialog(NotificationsDialogComponent, { size: "auto", closeable: false });

  protected toggleActiveStatus(watch: Watch) {
    return this.watchService.toggleActiveStatus(watch);
  }

  protected showNotifications() {
    this.dialog({ label: this.watch().label, notifications: this.notifications() }).subscribe();
  }

  protected deleteWatch(): void {
    const data: TuiConfirmData = {
      no: "Avbryt",
      yes: "Radera",
      appearance: "secondary-destructive",
    };

    this.dialogsService
      .open<boolean>(TUI_CONFIRM, {
        label: `Vill du radera bevakning: ${this.watch().label}?`,
        size: "m",
        closeable: false,
        data: data,
      })
      .pipe(
        tap(deleteAgreed => (deleteAgreed ? this.deleteWatchWithUndoAlert() : null)),
        take(1),
      )
      .subscribe();
  }

  /** **OBS**: Anrop för att radera bevakningen från db görs i {@link UndoAlertComponent} */
  protected deleteWatchWithUndoAlert() {
    this.watchService.deleteWatch(this.watch().id);

    this.alertsService
      .open(new PolymorpheusComponent(UndoAlertComponent), {
        label: `Raderade: ${this.watch().label}`,
        appearance: "info",
        data: this.watch().id,
      })
      .pipe(tap(() => this.watchService.addWatch(this.watch())))
      .subscribe();
  }
}
