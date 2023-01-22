import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _renderer!: Renderer2;
  private _colorTheme!: string;
  private currentThemeSubject$ = new BehaviorSubject<string>(
    this.getColorTheme()
  );

  // Från: https://www.youtube.com/watch?v=XIUv27nYcLE
  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    this.getColorTheme();
    this._renderer.addClass(document.body, this._colorTheme);
  }

  updateTheme(theme: 'dark-mode' | 'light-mode') {
    this.setColorTheme(theme);

    const previousColorTheme =
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this._renderer.removeClass(document.body, previousColorTheme);
    this._renderer.addClass(document.body, theme);
  }

  isDarkMode(): boolean {
    return this._colorTheme === 'dark-mode';
  }

  private setColorTheme(theme: string) {
    this._colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('user-theme')) {
      return (this._colorTheme = localStorage.getItem('user-theme') ?? '');
    } else {
      // Kolla vilket tema som användaren har satt i sitt OS.
      const userPrefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      return (this._colorTheme = userPrefersDark
        ? (this._colorTheme = 'dark-mode')
        : (this._colorTheme = 'light-mode'));
    }
  }

  public setCurrentTheme(currentTheme: string) {
    this.currentThemeSubject$.next(currentTheme);
  }

  public getCurrentTheme(): Observable<string> {
    return this.currentThemeSubject$.asObservable();
  }
}
