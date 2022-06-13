import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _renderer!: Renderer2;
  private _colorTheme!: string;

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
      this._colorTheme = localStorage.getItem('user-theme') ?? 'dark-mode';
    } else {
      // Kolla vilket tema som användaren har satt i sitt OS.
      const userPrefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      userPrefersDark
        ? (this._colorTheme = 'dark-mode')
        : (this._colorTheme = 'light-mode');

      this.setColorTheme(this._colorTheme);
    }
  }
}
