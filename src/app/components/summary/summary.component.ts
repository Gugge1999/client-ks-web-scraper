import { Component, computed, input } from "@angular/core";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-summary",
  standalone: true,
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
})
export class SummaryComponent {
  readonly watches = input.required<Watch[]>();
  readonly allWatchesLength = computed(() => this.watches().length);
  readonly activeWatchesLength = computed(() => this.watches().filter(w => w.active).length);
}
