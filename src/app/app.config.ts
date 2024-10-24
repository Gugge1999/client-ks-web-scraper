import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import localeSvSe from "@angular/common/locales/sv";
import { ApplicationConfig, enableProdMode, importProvidersFrom, LOCALE_ID, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { errorInterceptor } from "@interceptors/error-interceptor";
import { tuiHintOptionsProvider } from "@taiga-ui/core";
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { env } from "env/env";

const matSnackbarDefaultConfig: Readonly<MatSnackBarConfig> = {
  duration: 5_000,
  horizontalPosition: "right",
  verticalPosition: "bottom",
};

if (env.name === "prod") {
  enableProdMode();
}

registerLocaleData(localeSvSe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    tuiHintOptionsProvider({ showDelay: 100, hideDelay: 0 }),

    // TODO: Radera Material sen
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: matSnackbarDefaultConfig },
    { provide: LOCALE_ID, useValue: "sv-se" },
    NG_EVENT_PLUGINS,
  ],
};
