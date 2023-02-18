import { Observable, of } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProgressBarService } from '@shared/services/progress-bar/progess-bar-overlay.service';

@Component({
  selector: 'app-loader',
  templateUrl: './progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgessBarComponent implements OnInit {
  protected message$: Observable<string> = of('');

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.message$ = this.progressBarService.progessBarMessage;
  }
}
