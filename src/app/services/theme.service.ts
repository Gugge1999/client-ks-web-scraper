import { computed, inject, Injectable, signal } from "@angular/core";
import { TUI_DARK_MODE } from "@taiga-ui/core";
import { CookieService } from "./cookie.service";

export type Theme = "dark" | "light";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly cookieService = inject(CookieService);
  private readonly darkModeSig = inject(TUI_DARK_MODE);
  private readonly localStorageKey = "tuiDark";
  private readonly currentThemeSig = signal(this.getColorTheme());
  public readonly isDarkMode = computed(() => this.currentThemeSig() === "dark");

  initializeTheme() {
    this.setTheme(this.getColorTheme());
  }

  private getColorTheme(): Theme {
    const storedUserTheme = localStorage.getItem(this.localStorageKey) as "true" | "false" | null;

    if (storedUserTheme) {
      return storedUserTheme === "true" ? "dark" : "light";
    }

    const userPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

    return userPrefersDark.matches ? "dark" : "light";
  }

  setTheme(theme: Theme) {
    this.currentThemeSig.set(theme);

    const isDarkTheme = theme === "dark";

    this.darkModeSig.set(isDarkTheme);
  }

  updateTheme(theme: Theme) {
    this.setTheme(theme);

    if (this.cookieService.isCookieAcceptedFromLocalStorage()) {
      localStorage.setItem(this.localStorageKey, theme);
    }
  }
}
