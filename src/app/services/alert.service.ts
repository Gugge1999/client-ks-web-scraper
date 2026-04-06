import { TuiNotificationService } from "@taiga-ui/core";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private readonly alerts = inject(TuiNotificationService);

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
