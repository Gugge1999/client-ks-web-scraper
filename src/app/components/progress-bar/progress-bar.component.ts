import { Component } from '@angular/core';
import { ProgressBarOverlayService } from '@shared/services/progress-bar/progess-bar-overlay.service';

@Component({
  selector: 'app-loader',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgessBarComponent {
  message: string = '';

  constructor(private progressBarService: ProgressBarOverlayService) {
    this.progressBarService.progessBarMessage.subscribe((res) => {
      this.message = res;
    });
  }
}
