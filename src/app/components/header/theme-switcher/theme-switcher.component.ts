import { NgStyle } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule, TooltipPosition } from "@angular/material/tooltip";

@Component({
  selector: "scraper-theme-switcher",
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, NgStyle],
  templateUrl: "./theme-switcher.component.html",
  styleUrl: "./theme-switcher.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  isDarkMode = input.required<boolean>();

  @Input({ required: true }) tooltipPos!: TooltipPosition;
  @Input({ required: true }) iconColor!: "white" | "primary";
}
