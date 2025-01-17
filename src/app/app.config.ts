import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import localeSvSe from "@angular/common/locales/sv";
import { ApplicationConfig, LOCALE_ID, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { errorInterceptor } from "@interceptors/error.interceptor";
import { tuiHintOptionsProvider } from "@taiga-ui/core";
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAnalytics, provideAnalytics } from "@angular/fire/analytics";
import { FIREBASE_CONFIG } from "@constants/constants";
import { jwtTokenInterceptor } from "@interceptors/jwt-token.interceptor";

registerLocaleData(localeSvSe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    /*
     * För att kolla att zoneless fungerar
     */
    // provideExperimentalCheckNoChangesForDebug({
    //   interval: 1000, // run change detection every second
    //   exhaustive: true, // check all components
    // }),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor, jwtTokenInterceptor])), // jwtTokenInterceptor
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAnalytics(() => getAnalytics()),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      useValue: "sv-se",
    },

    // Taiga UI
    NG_EVENT_PLUGINS,
    tuiHintOptionsProvider({
      showDelay: 100,
      hideDelay: 0,
    }),
  ],
};
