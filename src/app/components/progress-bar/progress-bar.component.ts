import { Subject, takeUntil } from 'rxjs';

import { Component, OnDestroy } from '@angular/core';
import { ProgressBarOverlayService } from '@shared/services/progress-bar/progess-bar-overlay.service';

@Component({
  selector: 'app-loader',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgessBarComponent implements OnDestroy {
  message: string = '';
  private destroySubject$ = new Subject<void>();

  constructor(private progressBarService: ProgressBarOverlayService) {
    this.progressBarService.progessBarMessage
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res) => {
        this.message = res;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
