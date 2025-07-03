import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { FADE_IN_ANIMATION } from "@constants/constants";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-summary",
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FADE_IN_ANIMATION],
})
export class SummaryComponent {
  readonly watches = input.required<Watch[]>();
  readonly allWatchesLength = computed(() => this.watches().length);
  readonly activeWatchesLength = computed(() => this.watches().filter(w => w.active).length);
}
