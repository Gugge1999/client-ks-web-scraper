import { filter } from "rxjs/operators";

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { loadWatches } from "@store/actions/watch-api.actions";

declare const gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.setUpAnalytics();

    sessionStorage.removeItem("firstApiError");

    this.store.dispatch(loadWatches());
  }

  setUpAnalytics() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "G-2M7YJWSQ0F", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
