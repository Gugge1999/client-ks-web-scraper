import { Injectable, Renderer2, RendererFactory2, signal } from "@angular/core";
import { Theme } from "@models/constants";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public currentThemeSignal = signal(this.getColorTheme());

  private _renderer!: Renderer2;
  private _colorTheme!: string;

  // Från: https://www.youtube.com/watch?v=XIUv27nYcLE
  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    this.getColorTheme();
    this.currentThemeSignal.set(this._colorTheme);
    this._renderer.addClass(document.body, this._colorTheme);
  }

  updateTheme(theme: Theme.darkMode | Theme.lightMode) {
    this.setColorTheme(theme);

    const previousColorTheme = theme === Theme.darkMode ? Theme.lightMode : Theme.darkMode;
    this._renderer.removeClass(document.body, previousColorTheme);
    this._renderer.addClass(document.body, theme);

    this.currentThemeSignal.update(() => theme);
  }

  isDarkMode(): boolean {
    return this._colorTheme === Theme.darkMode;
  }

  public getColorTheme(): string {
    const userTheme = localStorage.getItem(Theme.userTheme);
    if (userTheme) {
      return (this._colorTheme = userTheme);
    } else {
      // Kolla vilket tema som användaren har satt i sitt OS.
      const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (userPrefersDark) {
        return (this._colorTheme = Theme.darkMode);
      } else {
        return (this._colorTheme = Theme.lightMode);
      }
    }
  }

  private setColorTheme(theme: string) {
    this._colorTheme = theme;
    localStorage.setItem(Theme.userTheme, theme);
  }
}
