import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CardActionsComponent } from "@components/card-actions/card-actions.component";
import { Watch } from "@models/watch.model";
import { TuiAppearance } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

@Component({
    selector: "scraper-card",
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DatePipe, CardActionsComponent, TuiAppearance, TuiCardLarge, TuiHeader]
})
export class CardComponent {
  watches = input.required<Watch[]>();

  readonly cardDateFormat = "d MMMM yyyy - H:mm:ss";
}
