import { computed, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BreakpointObserverService {
  private readonly query = "(max-width: 600px)";
  private readonly mediaQueryList = window.matchMedia(this.query);

  readonly isMobile = signal(this.mediaQueryList.matches);

  readonly appearanceDialogString = computed(() => (this.isMobile() ? "fullscreen" : "taiga"));

  constructor() {
    const handler = (event: MediaQueryListEvent) => {
      this.isMobile.set(event.matches);
    };

    this.mediaQueryList.addEventListener("change", handler);
  }
}
