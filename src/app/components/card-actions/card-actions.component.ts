import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { UndoAlertComponent } from "@components/undo-alert/undo-alert.component";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";
import { TuiAlertService, TuiHint } from "@taiga-ui/core";
import { TuiSwitch } from "@taiga-ui/kit";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { take, tap } from "rxjs";

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

  public readonly watchService = inject(WatchService);
  private readonly alerts = inject(TuiAlertService);

  toggleActiveStatus(watch: Watch) {
    this.watchService.toggleActiveStatus(watch);
  }

  protected deleteWatch() {
    /** OBS: Anrop för att radera bevakningen från db görs i {@link UndoAlertComponent} */
    this.watchService.deleteWatch(this.watch());

    this.alerts
      .open(new PolymorpheusComponent(UndoAlertComponent), {
        label: `Raderade: ${this.watch().label}`,
        appearance: "info",
        data: this.watch().id,
      })
      .pipe(
        tap(() => this.watchService.addWatch(this.watch())),
        take(1),
      )
      .subscribe();
  }
}
