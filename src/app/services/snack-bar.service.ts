import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly dismiss = "Avvisa";
  private readonly snackClass = "snack-bar";
  private readonly successConst = "success";
  private readonly warning = "warning";

  successSnackBar = (message: string) => this.snackBar.open(message, this.dismiss, { panelClass: `${this.snackClass}-${this.successConst}` });

  errorSnackBar = (message: string) => this.snackBar.open(`Error: ${message}`, this.dismiss, { panelClass: `${this.snackClass}-${this.warning}` });

  undoSnackBar = (message: string) => this.snackBar.open(message, "Ångra", { panelClass: `${this.snackClass}-${this.warning}` });
}
