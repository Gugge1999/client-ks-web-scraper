import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiHintDirective } from "@taiga-ui/core";
import { TuiSwitch } from "@taiga-ui/kit";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";
import { FADE_IN_ANIMATION } from "@constants/constants";

@Component({
  selector: "scraper-toggle-all",
  imports: [FormsModule, TuiHintDirective, TuiSwitch],
  templateUrl: "./toggle-all.component.html",
  styleUrl: "./toggle-all.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FADE_IN_ANIMATION],
})
export class ToggleAllComponent {
  readonly watches = input.required<Watch[]>();

  readonly isToggleActive = computed(() => this.watches().every(w => w.active));

  public readonly watchService = inject(WatchService);

  async toggleAll() {
    await this.watchService.toggleAll(
      !this.isToggleActive(),
      this.watches().map(m => m.id),
    );
  }
}
