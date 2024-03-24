import { Injectable, Renderer2, signal } from "@angular/core";

import { Theme } from "@models/constants";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _currentTheme = signal(this.getColorTheme());
  private _renderer!: Renderer2;
  private _colorTheme!: string;

  public getCurrentTheme() {
    return this._currentTheme.asReadonly();
  }

  initTheme() {
    this.getColorTheme();
    this._currentTheme.set(this._colorTheme);
    document.documentElement.setAttribute("theme", this._colorTheme);
  }

  updateTheme(theme: Theme.dark | Theme.light) {
    this.setColorTheme(theme);

    document.documentElement.setAttribute("theme", theme);

    this._currentTheme.set(theme);
  }

  isDarkMode(): boolean {
    return document.documentElement.getAttribute("theme") === Theme.dark;
  }

  private getColorTheme(): string {
    const userTheme = localStorage.getItem(Theme.userTheme);
    if (userTheme) {
      return (this._colorTheme = userTheme);
    } else {
      const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (userPrefersDark) {
        return (this._colorTheme = Theme.dark);
      } else {
        return (this._colorTheme = Theme.light);
      }
    }
  }

  private setColorTheme(theme: string) {
    this._colorTheme = theme;
    localStorage.setItem(Theme.userTheme, theme);
  }
}
