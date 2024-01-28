import { LayoutModule } from "@angular/cdk/layout";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { APP_INITIALIZER, enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "@environments/environment";
import { AppConfigService } from "@shared/services/utils/app-config.service";
import { HttpErrorInterceptor } from "@shared/services/utils/http-error-interceptor.service";
import { effects } from "@store/effects/index";
import { reducers } from "@store/reducers/index";
import { AppComponent } from "./app/app.component";
import { MaterialModule } from "./app/material.module";

const appConfigInitializer = (appConfig: AppConfigService) => {
  return () => appConfig.loadAppConfig();
};

if (environment.name === "prod") {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      LayoutModule,
      FormsModule,
      MaterialModule,
      ReactiveFormsModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot(effects),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ),
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
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));

