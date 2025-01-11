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
import { errorInterceptor } from "@interceptors/error.interceptor";
import { tuiHintOptionsProvider } from "@taiga-ui/core";
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { env } from "@env/env";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAnalytics, provideAnalytics } from "@angular/fire/analytics";

if (env.name === "prod") {
  enableProdMode();
}

registerLocaleData(localeSvSe);

const firebaseConfig = {
  apiKey: "AIzaSyDJ7ITz4fNpZbOA2IHfhPC_V_KKmrd-Rq8",
  authDomain: "ks-web-scraper.firebaseapp.com",
  projectId: "ks-web-scraper",
  storageBucket: "ks-web-scraper.firebasestorage.app",
  messagingSenderId: "330274214889",
  appId: "1:330274214889:web:2a7f4ec0010d99900bf178",
  measurementId: "G-2M7YJWSQ0F",
} as const;

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
    provideHttpClient(withInterceptors([errorInterceptor])), // jwtTokenInterceptor
    importProvidersFrom(BrowserModule),
    // TODO: Behöver det bara en spread operator?
    provideFirebaseApp(() => initializeApp({ ...firebaseConfig })),
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
      appearance: "dark",
    }),
  ],
};
