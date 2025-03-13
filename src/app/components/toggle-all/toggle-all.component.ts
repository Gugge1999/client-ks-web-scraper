import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiHintDirective } from "@taiga-ui/core";
import { TuiSwitch } from "@taiga-ui/kit";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";
import { fadeInAnimation } from "@constants/constants";

@Component({
  selector: "scraper-toggle-all",
  imports: [FormsModule, TuiHintDirective, TuiSwitch],
  templateUrl: "./toggle-all.component.html",
  styleUrl: "./toggle-all.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ToggleAllComponent {
  readonly watches = input.required<Watch[]>();

  readonly isToggleActive = computed(() => this.watches().every(w => w.active));

  public readonly watchService = inject(WatchService);

  toggleAll() {
    this.watchService.toggleAll(
      !this.isToggleActive(),
      this.watches().map(m => m.id),
    );
  }
}
