import { inject, Injectable } from "@angular/core";
import { TuiAlertService } from "@taiga-ui/core";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private readonly alerts = inject(TuiAlertService);

  successAlert = (message: string) => this.alerts.open(message, { appearance: "success" }).subscribe();

  errorAlert = (message: string) => this.alerts.open(`Error: ${message}`, { appearance: "error" }).subscribe();

  // TODO: Fixa med component sen
  // undoSnackBar = (message: string) => this.alerts.open(message, "Ångra").subscribe();
}
