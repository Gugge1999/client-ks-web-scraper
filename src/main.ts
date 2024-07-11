import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import localeSvSe from "@angular/common/locales/sv";
import { APP_INITIALIZER, LOCALE_ID, enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { environment } from "@environments/environment";
import { errorInterceptor } from "@interceptors/error-interceptor";
import { ConfigService } from "@services/app-config.service";
import { AppComponent } from "./app/app.component";

registerLocaleData(localeSvSe);

const appConfigInitializer = (appConfig: ConfigService) => () => appConfig.loadAppConfig();

if (environment.name === "prod") {
  enableProdMode();
}

const matSnackbarDefaultConfig: Readonly<MatSnackBarConfig> = {
  duration: 5_000,
  horizontalPosition: "right",
  verticalPosition: "bottom",
};

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    importProvidersFrom(BrowserModule),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: appConfigInitializer,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackbarDefaultConfig,
    },
    { provide: LOCALE_ID, useValue: "sv-se" },
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor])),
  ],
}).catch((err) => console.error(err));
