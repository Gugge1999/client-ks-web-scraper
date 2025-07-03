import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Watch } from "@models/watch.model";
import { TuiAppearance, TuiHint } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { CARD_DATE_FORMAT, fadeInAnimation } from "@constants/constants";
import { BevakningarCardActionsComponent } from "@components/bevakningar-card-actions/bevakningar-card-actions.component";

@Component({
  selector: "scraper-bevakningar-cards",
  imports: [DatePipe, TuiAppearance, TuiCardLarge, TuiHeader, BevakningarCardActionsComponent, TuiHint],
  templateUrl: "./bevakningar-cards.component.html",
  styleUrl: "./bevakningar-cards.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class BevakningarCardsComponent {
  readonly watches = input.required<Watch[]>();

  readonly cardDateFormat = CARD_DATE_FORMAT;
}
