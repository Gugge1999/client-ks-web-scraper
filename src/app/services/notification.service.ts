import { TuiNotificationService } from "@taiga-ui/core";
import { inject, Service } from "@angular/core";

@Service()
export class NotificationService {
  private readonly alerts = inject(TuiNotificationService);

  successNotification(message: string) {
    this.alerts.open(message, { appearance: "positive" }).subscribe();
  }

  infoNotification(message: string) {
    this.alerts.open(message, { appearance: "info" }).subscribe();
  }

  errorNotification(message: string, config?: { sticky: true }) {
    this.alerts.open(message, { appearance: "negative", autoClose: config?.sticky ? 0 : 5000 }).subscribe();
  }
}
