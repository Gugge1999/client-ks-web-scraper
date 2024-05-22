import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);

  successSnackBar = (message: string) => this.snackBar.open(message, "Avvisa", { panelClass: "snackbar-success" });
  infoSnackBar = (message: string) => this.snackBar.open(message, "Avvisa", { panelClass: "snackbar-info" });
  errorSnackBar = (message: string) => this.snackBar.open(`Error: ${message}`, "Avvisa", { panelClass: "snack-bar-warning" });
  undoSnackBar = (message: string) => this.snackBar.open(message, "Ångra", { panelClass: "snack-bar-warning" });
}
