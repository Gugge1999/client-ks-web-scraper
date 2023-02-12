import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiStatusDialogComponent } from '@components/api-status-dialog/api-status-dialog.component';
import { DeleteWatchDialogComponent } from '@components/delete-watch-dialog/delete-watch-dialog.component';
import { NewWatchDialogComponent } from '@components/new-watch-dialog/new-watch-dialog.component';
import { ProgessBarComponent } from '@components/progress-bar/progress-bar.component';
import { ScraperCardComponent } from '@components/scraper-card/scraper-card.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FooterComponent } from '@shared/layout/footer/footer.component';
import { HeaderComponent } from '@shared/layout/header/header.component';
import { AppConfigService } from '@shared/services/utils/app-config.service';
import { HttpErrorInterceptor } from '@shared/services/utils/http-error-interceptor.service';
import { effects } from '@store/effects/index';
import { reducers } from '@store/reducers/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

const appConfigInitializer = (appConfig: AppConfigService) => {
  return () => appConfig.loadAppConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    ScraperCardComponent,
    NewWatchDialogComponent,
    DeleteWatchDialogComponent,
    ApiStatusDialogComponent,
    FooterComponent,
    HeaderComponent,
    ProgessBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducers,

      {
        // TODO: Fulhack för att få dialog att fungera
        runtimeChecks: {
          strictActionImmutability: false,
          strictActionSerializability: false,
          strictActionTypeUniqueness: isDevMode(),
          strictActionWithinNgZone: isDevMode(),
          strictStateImmutability: isDevMode(),
          strictStateSerializability: false,
        },
      }
    ),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
