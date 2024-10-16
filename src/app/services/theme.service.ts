import { Injectable, computed, inject, signal } from "@angular/core";

import { CookieService } from "./cookie.service";

type Theme = "dark" | "light";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly cookieService = inject(CookieService);
  private readonly localStorageKey = "user-theme";
  private currentTheme = signal(this.getColorTheme());
  isDarkMode = computed(() => (this.currentTheme() === "dark" ? true : false));
  initTheme = () => this.setTheme(this.getColorTheme());

  private getColorTheme(): Theme {
    const storedUserTheme = localStorage.getItem(this.localStorageKey);

    if (storedUserTheme) {
      return storedUserTheme as Theme;
    }

    const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return userPrefersDark ? "dark" : "light";
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute("theme", theme);
  }

  updateTheme(theme: Theme) {
    this.setTheme(theme);

    if (this.cookieService.isCookieAccepted()) {
      localStorage.setItem(this.localStorageKey, theme);
    }
  }
}
