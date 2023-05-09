import { Observable } from "rxjs";

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ThemeService } from "@shared/services/utils/theme.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./footer.component.scss"],
  standalone: true,
  imports: [AsyncPipe],
})
export class FooterComponent implements OnInit {
  darkModeFooterColors = {
    top: "#5c5c5c",
    middle: "#4f4f4f",
    bottom: "#404040",
  };

  lightModeFooterColors = {
    top: "#ededed",
    middle: "#c9c9c9",
    bottom: "#999999",
  };

  protected currentTheme$!: Observable<string>;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme$ = this.themeService.getCurrentTheme();
  }
}
