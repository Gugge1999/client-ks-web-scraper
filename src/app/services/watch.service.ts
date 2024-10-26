import { inject, Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";

import { errorMessageConst } from "@constants/constants";
import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { WatchApiService } from "@services/watch-api.service";
import { AlertService } from "@services/alert.service";

@Injectable({
  providedIn: "root",
})
export class WatchService {
  private _watches = signal<Watch[]>([]);
  readonly watches = this._watches.asReadonly();

  private readonly watchApiService = inject(WatchApiService);
  private readonly alertService = inject(AlertService);

  async getAllWatches() {
    this._watches.set(await lastValueFrom(this.watchApiService.getAllWatches()));
  }

  deleteWatch(watch: Watch) {
    this._watches.update(watches => watches.filter(w => w.id !== watch.id));
  }

  addWatch(watch: Watch) {
    this._watches.update(watches => [...watches, watch].sort((a, b) => Date.parse(a.added.toString()) - Date.parse(b.added.toString())));
  }

  async saveNewWatch(newWatchDTO: NewWatchFormDTO) {
    const newWatch = await lastValueFrom(this.watchApiService.saveNewWatch(newWatchDTO)).catch((err: ApiError) => err);

    if (errorMessageConst in newWatch) {
      return newWatch;
    }

    this.alertService.successAlert(`Ny bevakning skapad för: ${newWatchDTO.label}`);
    this._watches.update(watches => [...watches, newWatch]);

    return newWatch;
  }

  async toggleActiveStatus(watch: Watch) {
    const { active, id, label } = watch;
    const updatedWatch = await lastValueFrom(this.watchApiService.toggleActiveStatus({ active, id, label })).catch((err: ApiError) => err);

    if (errorMessageConst in updatedWatch) {
      this._watches.set(structuredClone(this._watches()));
      return;
    }

    this.alertService.infoAlert(`${updatedWatch.active ? "Aktivera:" : "Inaktivera:"} ${updatedWatch.label}`);

    this._watches.update(watches =>
      watches.map(w => {
        if (w.id === updatedWatch.id) {
          w.active = updatedWatch.active;
        }

        return w;
      }),
    );
  }
}
