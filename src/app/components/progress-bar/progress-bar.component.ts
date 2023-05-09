import { Observable } from "rxjs";

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ProgressBarService } from "@shared/services/progress-bar/progess-bar-overlay.service";
import { AsyncPipe } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-loader",
  templateUrl: "./progress-bar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./progress-bar.component.scss"],
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, AsyncPipe],
})
export class ProgessBarComponent implements OnInit {
  protected message$!: Observable<string>;

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.message$ = this.progressBarService.progessBarMessage;
  }
}
