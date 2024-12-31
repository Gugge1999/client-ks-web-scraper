import { Component, computed, input } from "@angular/core";
import { Watch } from "@models/watch.model";
import { fadeInAnimation } from "@constants/constants";

@Component({
  selector: "scraper-summary",
  standalone: true,
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
  animations: [fadeInAnimation],
})
export class SummaryComponent {
  readonly watches = input.required<Watch[]>();
  readonly allWatchesLength = computed(() => this.watches().length);
  readonly activeWatchesLength = computed(() => this.watches().filter(w => w.active).length);
}
