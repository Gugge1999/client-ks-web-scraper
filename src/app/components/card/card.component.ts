import { DatePipe } from "@angular/common";
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, input } from "@angular/core";
import { CardActionsComponent } from "@components/card-actions/card-actions.component";
import { Watch } from "@models/watch.model";
import { TuiAppearance } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { cardDateFormat } from "@constants/constants";

@Component({
  selector: "scraper-card",
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  imports: [DatePipe, CardActionsComponent, TuiAppearance, TuiCardLarge, TuiHeader],
  animations: [
    trigger("flyInOut", [
      transition(
        ":enter",
        [
          style({
            transform: "scale({{start}})",
          }),
          animate("{{duration}}ms {{easing}}", style({ transform: "scale({{end}})" })),
        ],
        { params: { end: 1, start: 0, duration: 300, easing: "ease-in-out" } },
      ),
      transition(
        ":leave",
        [
          style({
            transform: "scale({{end}})",
          }),
          animate("{{duration}}ms ease-in-out", style({ transform: "scale({{start}})" })),
        ],
        {
          params: { end: 1, start: 0, duration: 300 },
        },
      ),
    ]),
  ],
})
export class CardComponent {
  watches = input.required<Watch[]>();

  readonly cardDateFormat = cardDateFormat;
}
