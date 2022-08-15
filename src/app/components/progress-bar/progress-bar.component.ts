import { Observable, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ProgressBarOverlayService } from '@shared/services/progress-bar/progess-bar-overlay.service';

@Component({
  selector: 'app-loader',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgessBarComponent implements OnInit {
  protected message$: Observable<string> = of('');

  constructor(private progressBarService: ProgressBarOverlayService) {}

  ngOnInit(): void {
    this.message$ = this.progressBarService.getProgessBarMessage();
  }
}
