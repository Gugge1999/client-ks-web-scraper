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
    this.colorTheme;
    console.log('colorTheme', this.colorTheme);
    this._renderer.addClass(document.body, this._colorTheme);
  }

  updateTheme(theme: 'dark-mode' | 'light-mode') {
    this.colorTheme = theme;

    const previousColorTheme =
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this._renderer.removeClass(document.body, previousColorTheme);
    this._renderer.addClass(document.body, theme);
  }

  isDarkMode(): boolean {
    return this._colorTheme === 'dark-mode';
  }

  private set colorTheme(theme: string) {
    this._colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private get colorTheme(): string {
    if (localStorage.getItem('user-theme')) {
      return (this.colorTheme =
        localStorage.getItem('user-theme') ?? 'dark-mode');
    } else {
      // Kolla vilket tema som användaren har satt i sitt OS.
      const userPrefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      const theme = userPrefersDark
        ? (this.colorTheme = 'dark-mode')
        : (this.colorTheme = 'light-mode');

      return theme;
    }
  }
}
