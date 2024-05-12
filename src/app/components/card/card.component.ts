import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

import { MatCardModule } from "@angular/material/card";
import { CardActionsComponent } from "@components/card-actions/card-actions.component";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-card",
  standalone: true,
  imports: [MatCardModule, DatePipe, CardActionsComponent],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  watches = input.required<Watch[]>();

  readonly cardDateFormat = "d MMMM yyyy - H:mm:ss";
}
