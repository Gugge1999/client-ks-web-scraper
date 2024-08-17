import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-summary",
  standalone: true,
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  watches = input.required<Watch[]>();
  allWatchesLength = computed(() => this.watches().length);
  activeWatchesLength = computed(() => this.watches().filter((m) => m.active).length);
}
