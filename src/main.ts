import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { environment } from "@environments/environment";

import { AppModule } from "./app/app.module";

if (environment.name === "prod") {
  console.log("prod mode enabled.");

  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
