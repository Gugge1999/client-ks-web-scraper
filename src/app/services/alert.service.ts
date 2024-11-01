import { inject, Injectable } from "@angular/core";
import { TuiAlertService } from "@taiga-ui/core";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private readonly alerts = inject(TuiAlertService);

  successAlert(message: string): void {
    this.alerts.open(message, { appearance: "success" }).subscribe();
  }

  infoAlert(message: string): void {
    this.alerts.open(message, { appearance: "info" }).subscribe();
  }

  errorAlert(message: string, config?: { sticky: true }): void {
    this.alerts.open(`Error: ${message}`, { appearance: "error", autoClose: config?.sticky ? 0 : 5000 }).subscribe();
  }
}
