import { Observable, of } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@app/shared/services/utils/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  protected currentTheme$: Observable<string> = of('');

  darkModeFooterColors = {
    top: '#5c5c5c',
    middle: '#4f4f4f',
    bottom: '#404040',
  };

  lightModeFooterColors = {
    top: '#ededed',
    middle: '#c9c9c9',
    bottom: '#999999',
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme$ = this.themeService.getCurrentTheme();
  }
}
