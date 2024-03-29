import { Injectable, computed, signal } from "@angular/core";

import { Theme } from "@models/constants";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private currentTheme = signal(this.getColorTheme());
  isDarkMode = computed(() => (this.currentTheme() === Theme.dark ? true : false));

  initTheme() {
    const theme = this.getColorTheme();
    this.setTheme(theme);
  }

  private getColorTheme() {
    const userTheme = localStorage.getItem(Theme.userTheme);
    if (userTheme) {
      return userTheme;
    } else {
      const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      return userPrefersDark ? Theme.dark : Theme.light;
    }
  }

  setTheme(theme: string) {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute("theme", theme);
  }

  updateTheme(theme: Theme.dark | Theme.light) {
    this.setTheme(theme);
    localStorage.setItem(Theme.userTheme, theme);
  }
}
