import { Injectable, computed, signal } from "@angular/core";

import { Theme } from "@models/constants";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly localStorageKey = "user-theme";
  private currentTheme = signal(this.getColorTheme());
  isDarkMode = computed(() => (this.currentTheme() === Theme.Dark ? true : false));

  initTheme() {
    const theme = this.getColorTheme();
    this.setTheme(theme);
  }

  private getColorTheme() {
    const storedUserTheme = localStorage.getItem(this.localStorageKey);

    if (storedUserTheme) {
      return storedUserTheme;
    }

    const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return userPrefersDark ? Theme.Dark : Theme.Light;
  }

  setTheme(theme: string) {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute("theme", theme);
  }

  updateTheme(theme: Theme) {
    this.setTheme(theme);
    localStorage.setItem(this.localStorageKey, theme);
  }
}
