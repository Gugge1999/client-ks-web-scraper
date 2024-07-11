import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly dismissMessage = "Avvisa";
  private readonly undoMessage = "Ångra";
  private readonly snackBarClassConst = "snack-bar";
  private readonly successConst = "success";
  private readonly warningConst = "warning";

  // TODO: Det kanske går att slå ihop alla dessa till endast en funktion
  successSnackBar = (message: string) => {
    return this.snackBar.open(message, this.dismissMessage, { panelClass: `${this.snackBarClassConst}-${this.successConst}` });
  };

  errorSnackBar = (message: string) => {
    return this.snackBar.open(`Error: ${message}`, this.dismissMessage, { panelClass: `${this.snackBarClassConst}-${this.warningConst}` });
  };

  undoSnackBar = (message: string) => {
    return this.snackBar.open(message, this.undoMessage, { panelClass: `${this.snackBarClassConst}-${this.warningConst}` });
  };
}
