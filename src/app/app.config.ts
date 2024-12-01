import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import localeSvSe from "@angular/common/locales/sv";
import {
  ApplicationConfig,
  enableProdMode,
  importProvidersFrom,
  LOCALE_ID,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { errorInterceptor } from "@interceptors/error-interceptor";
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { env } from "env/env";

if (env.name === "prod") {
  enableProdMode();
}

registerLocaleData(localeSvSe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // tuiHintOptionsProvider({ showDelay: 100, hideDelay: 0, appearance: "dark" }),
    provideHttpClient(withInterceptors([errorInterceptor])),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    NG_EVENT_PLUGINS,

    { provide: LOCALE_ID, useValue: "sv-se" },
  ],
};
