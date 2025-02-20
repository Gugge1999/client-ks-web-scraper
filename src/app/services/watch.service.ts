import { inject, Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { WatchApiService } from "@services/watch-api.service";
import { AlertService } from "@services/alert.service";

@Injectable({
  providedIn: "root",
})
export class WatchService {
  private readonly watchApiService = inject(WatchApiService);
  private readonly alertService = inject(AlertService);

  private readonly _watches = this.watchApiService.getAllWatches();

  readonly watches = this._watches.asReadonly();

  deleteWatch(watchId: string) {
    this._watches.value.update(watches => watches.filter(w => w.id !== watchId));
  }

  addWatch(watch: Watch) {
    this._watches.value.update(watches => {
      return [...watches, watch].sort((a, b) => Date.parse(a.added.toString()) - Date.parse(b.added.toString()));
    });
  }

  async saveNewWatch(newWatchDTO: NewWatchDTO) {
    const apiRes = await lastValueFrom(this.watchApiService.saveNewWatch(newWatchDTO)).catch((err: ApiError) => err);

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      return apiRes;
    }

    this.alertService.successAlert(`Ny bevakning skapad för: ${newWatchDTO.label}`);
    this._watches.value.update(watches => [...watches, apiRes]);

    return apiRes;
  }

  async toggleAll(activateAll: boolean, ids: string[]) {
    const apiRes = await lastValueFrom(this.watchApiService.toggleActiveStatus({ ids: ids, newActiveStatus: activateAll })).catch(
      (err: ApiError) => err,
    );

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      return;
    }

    this.alertService.successAlert((activateAll ? `Aktiverade` : `Inaktiverade`) + ` alla bevakningar`);
    const newWatches = this.watches.value().map(watch => {
      watch.active = activateAll;
      return watch;
    });

    this._watches.set(newWatches);
    return apiRes;
  }

  async toggleActiveStatus(watch: Watch) {
    const newActiveStatus = !watch.active;

    this._watches.value.update(watches =>
      watches.map(w => {
        if (w.id === watch.id) {
          w.active = !watch.active;
        }

        return w;
      }),
    );

    const res = await lastValueFrom(
      this.watchApiService.toggleActiveStatus({ ids: [watch.id], newActiveStatus: newActiveStatus }),
    ).catch((err: ApiError) => err);

    if (STACK_API_ERROR_PROPERTY in res) {
      return;
    }

    this.alertService.infoAlert(`${newActiveStatus === true ? "Aktivera:" : "Inaktivera:"} ${watch.label}`);
  }
}
