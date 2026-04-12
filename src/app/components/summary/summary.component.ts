import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-summary",
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  readonly watches = input.required<Watch[]>();
  readonly watchesArrLength = computed(() => this.watches().length);
  readonly activeWatchesArrLength = computed(() => this.watches().filter(w => w.active).length);
}
