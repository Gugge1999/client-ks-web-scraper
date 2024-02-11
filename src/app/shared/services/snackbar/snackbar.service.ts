import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Watch } from "@models/watch.model";
import { Store } from "@ngrx/store";
import { deleteWatch } from "@store/actions/watch-api.actions";
import { addWatch } from "@store/actions/watch.actions";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(
    private snackbar: MatSnackBar,
    private store: Store,
  ) {}

  successSnackbar(message: string) {
    this.snackbar.open(message, "Dismiss", {
      panelClass: "snackbar-success",
    });
  }

  infoSnackbar(message: string) {
    this.snackbar.open(message, "Dismiss", {
      panelClass: "snackbar-info",
    });
  }

  errorSnackbar(message = "Something went wrong") {
    this.snackbar.open(`Error: ${message}`, "Dismiss", {
      panelClass: "snackbar-warning",
    });
  }

  deleteSnackbarWithUndoAction(watch: Watch) {
    const snackbar = this.snackbar.open(`Deleted watch: ${watch.label}`, "Undo", {
      panelClass: ["snackbar-warning"],
    });

    // TODO: Behöver man köra unsubscribe på snackbar ???
    snackbar.afterDismissed().subscribe((res) => {
      // Om dismissedByAction är sant (användaren klickade på Undo)
      // ska klockan inte tas bort
      if (res.dismissedByAction === true) {
        return this.store.dispatch(addWatch({ watch }));
      } else {
        return this.store.dispatch(deleteWatch({ watch }));
      }
    });
  }
}
