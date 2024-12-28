import { DatePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { CardActionsComponent } from "@components/card-actions/card-actions.component";
import { Watch } from "@models/watch.model";
import { TuiAppearance } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { cardDateFormat, fadeInAnimation } from "@constants/constants";

// TODO: Byt namn till bevakningar
@Component({
  selector: "scraper-card",
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  imports: [DatePipe, CardActionsComponent, TuiAppearance, TuiCardLarge, TuiHeader],
  animations: [fadeInAnimation],
})
export class CardComponent {
  watches = input.required<Watch[]>();

  readonly cardDateFormat = cardDateFormat;
}
