import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  private readonly snackbar = inject(MatSnackBar);

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
}
