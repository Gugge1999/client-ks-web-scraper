import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import localeSvSe from "@angular/common/locales/sv";
import { LOCALE_ID, enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";

import { provideAnimations } from "@angular/platform-browser/animations";
import { environment } from "@environments/environment";
import { errorInterceptor } from "@interceptors/error-interceptor";
import { AppComponent } from "./app/app.component";

if (environment.name === "prod") {
  enableProdMode();
}
registerLocaleData(localeSvSe);

const matSnackbarDefaultConfig: Readonly<MatSnackBarConfig> = {
  duration: 5_000,
  horizontalPosition: "right",
  verticalPosition: "bottom",
};

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: matSnackbarDefaultConfig },
    { provide: LOCALE_ID, useValue: "sv-se" },
  ],
}).catch(err => console.error(err));
