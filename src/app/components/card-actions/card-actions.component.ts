import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UndoAlertComponent } from "@components/undo-alert/undo-alert.component";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";
import { TuiAlertService, TuiDialogService, TuiHint, TuiIcon } from "@taiga-ui/core";
import { TUI_CONFIRM, TuiConfirmData, TuiSwitch } from "@taiga-ui/kit";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { take, tap } from "rxjs";

@Component({
  selector: "scraper-card-actions",
  templateUrl: "./card-actions.component.html",
  styleUrl: "./card-actions.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TuiSwitch, TuiHint, TuiIcon],
})
export class CardActionsComponent {
  watch = input.required<Watch>();

  public readonly watchService = inject(WatchService);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);

  toggleActiveStatus(watch: Watch) {
    return this.watchService.toggleActiveStatus(watch);
  }

  protected deleteWatch(): void {
    const data: TuiConfirmData = {
      no: "Avbryt",
      yes: "Radera",
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: `Vill du radera ${this.watch().label}?`,
        size: "auto",
        closeable: false,
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
