import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltip } from "@angular/material/tooltip";
import { Store } from "@ngrx/store";

import { Watch } from "@models/watch.model";
import { openDeleteWatchDialog } from "@store/actions/dialog.actions";
import { toggleActiveStatus } from "@store/actions/watch-api.actions";

@Component({
  selector: "ks-scraper-card-actions",
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, MatTooltip, MatButtonModule, MatCardActions],
  templateUrl: "./card-actions.component.html",
  styleUrl: "./card-actions.component.scss",
})
export class CardActionsComponent {
  watch = input.required<Watch>();

  constructor(private store: Store) {}

  deleteWatchDialog(watch: Watch) {
    this.store.dispatch(
      openDeleteWatchDialog({
        watch,
      }),
    );
  }

  toggleActiveStatus(watch: Watch) {
    this.store.dispatch(toggleActiveStatus({ watch }));
  }
}
