/// <reference types="@angular/localize" />

import { LayoutModule } from "@angular/cdk/layout";
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { environment } from "@environments/environment";
import { AppConfigService } from "@services/app-config.service";
import { HttpErrorInterceptor } from "@services/http-error-interceptor.service";
import { AppComponent } from "./app/app.component";

const appConfigInitializer = (appConfig: AppConfigService) => () => appConfig.loadAppConfig();

if (environment.name === "prod") {
  enableProdMode();
}

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  duration: 5_000,
  horizontalPosition: "right",
  verticalPosition: "bottom",
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, LayoutModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: appConfigInitializer,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackbarDefaultConfig,
    },
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
}).catch((err) => console.error(err));
