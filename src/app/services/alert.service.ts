import { inject, Injectable } from "@angular/core";
import { TuiAlertService } from "@taiga-ui/core";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private readonly alerts = inject(TuiAlertService);

  successAlert(message: string) {
    this.alerts.open(message, { appearance: "success" }).subscribe();
  }

  infoAlert(message: string) {
    this.alerts.open(message, { appearance: "info" }).subscribe();
  }

  errorAlert(message: string, config?: { sticky: true }) {
    this.alerts.open(message, { appearance: "error", autoClose: config?.sticky ? 0 : 5000 }).subscribe();
  }
}
