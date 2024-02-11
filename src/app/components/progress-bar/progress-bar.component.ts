import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "ks-scraper-loader",
  templateUrl: "./progress-bar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./progress-bar.component.scss",
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
})
export class ProgessBarComponent {}
