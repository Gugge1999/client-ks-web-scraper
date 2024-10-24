import { Injectable, computed, inject, signal } from "@angular/core";
import { TUI_DARK_MODE } from "@taiga-ui/core";
import { CookieService } from "./cookie.service";

type Theme = "dark" | "light";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly cookieService = inject(CookieService);
  private readonly darkModeSig = inject(TUI_DARK_MODE);
  private readonly localStorageKey = "user-theme";
  private currentThemeSig = signal(this.getColorTheme());
  isDarkMode = computed(() => (this.currentThemeSig() === "dark" ? true : false));

  initializeTheme() {
    this.setTheme(this.getColorTheme());
  }

  private getColorTheme(): Theme {
    const storedUserTheme = localStorage.getItem(this.localStorageKey);

    if (storedUserTheme) {
      return storedUserTheme as Theme;
    }

    const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return userPrefersDark ? "dark" : "light";
  }

  setTheme(theme: Theme) {
    this.currentThemeSig.set(theme);
    this.darkModeSig.set(theme === "dark" ? true : false);
  }

  updateTheme(theme: Theme) {
    this.setTheme(theme);

    if (this.cookieService.isCookieAccepted()) {
      localStorage.setItem(this.localStorageKey, theme);
    }
  }
}
