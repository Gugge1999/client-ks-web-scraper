import { LayoutModule } from "@angular/cdk/layout";
import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import localeSvSe from "@angular/common/locales/sv";
import { APP_INITIALIZER, LOCALE_ID, enableProdMode, importProvidersFrom } from "@angular/core";
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

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  duration: 7_500,
  horizontalPosition: "right",
  verticalPosition: "bottom",
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, LayoutModule),
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
    provideHttpClient(withInterceptors([errorInterceptor]), withFetch()),
  ],
}).catch((err) => console.error(err));
