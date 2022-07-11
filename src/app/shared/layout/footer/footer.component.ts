import { Subject, takeUntil } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '@app/shared/services/utils/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  private destroySubject$ = new Subject<void>();
  protected currentTheme!: string;

  darkModeFooterColors = {
    levelOne: '#5c5c5c',
    levelTwo: '#4f4f4f',
    levelThree: '#404040',
  };

  lightModeFooterColors = {
    levelOne: '#ededed',
    levelTwo: '#c9c9c9',
    levelThree: '#999999',
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService
      .getCurrentTheme()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res) => {
        this.currentTheme = res;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
