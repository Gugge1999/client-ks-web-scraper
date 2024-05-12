import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  private readonly snackbar = inject(MatSnackBar);

  successSnackbar = (message: string) => this.snackbar.open(message, "Avvisa", { panelClass: "snackbar-success" });
  infoSnackbar = (message: string) => this.snackbar.open(message, "Avvisa", { panelClass: "snackbar-info" });
  errorSnackbar = (message: string) => this.snackbar.open(`Error: ${message}`, "Avvisa", { panelClass: "snackbar-warning" });
  undoSnackbar = (message: string) => this.snackbar.open(message, "Ångra", { panelClass: "snackbar-warning" });
}
