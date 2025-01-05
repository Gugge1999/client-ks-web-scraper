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
import { jwtTokenInterceptor } from "@interceptors/jwt-token.interceptor";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

if (env.name === "prod") {
  enableProdMode();
}

registerLocaleData(localeSvSe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // För att kolla att zoneless fungerar
    // provideExperimentalCheckNoChangesForDebug({
    //   interval: 1000, // run change detection every second
    //   exhaustive: true, // check all components
    // }),
    provideHttpClient(withInterceptors([errorInterceptor, jwtTokenInterceptor])),
    importProvidersFrom(BrowserModule),
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
