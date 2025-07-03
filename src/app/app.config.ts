import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import localeSvSe from "@angular/common/locales/sv";
import { ApplicationConfig, isDevMode, LOCALE_ID, provideZonelessChangeDetection } from "@angular/core";
import { getAnalytics, provideAnalytics } from "@angular/fire/analytics";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { errorInterceptor } from "@interceptors/error.interceptor";
import { tuiHintOptionsProvider } from "@taiga-ui/core";
import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { provideServiceWorker } from "@angular/service-worker";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

registerLocaleData(localeSvSe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])), // jwtTokenInterceptor
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAnalytics(() => getAnalytics()),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      useValue: "sv-se",
    },
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),

    // Taiga UI
    provideEventPlugins(),
    tuiHintOptionsProvider({
      showDelay: 100,
      hideDelay: 0,
    }),
  ],
};

const FIREBASE_CONFIG: Readonly<Record<string, string>> = {
  apiKey: "AIzaSyDJ7ITz4fNpZbOA2IHfhPC_V_KKmrd-Rq8",
  authDomain: "ks-web-scraper.firebaseapp.com",
  projectId: "ks-web-scraper",
  storageBucket: "ks-web-scraper.firebasestorage.app",
  messagingSenderId: "330274214889",
  appId: "1:330274214889:web:2a7f4ec0010d99900bf178",
  measurementId: "G-2M7YJWSQ0F",
};
