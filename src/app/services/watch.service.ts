import { Injectable, inject, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";

import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { errorMessageConst } from "@models/constants";
import { Watch } from "@models/watch.model";
import { SnackBarService } from "@services/snack-bar.service";
import { WatchApiService } from "@services/watch-api.service";

@Injectable({
  providedIn: "root",
})
export class WatchService {
  private _watches = signal<Watch[]>([]);
  readonly watches = this._watches.asReadonly();

  private readonly watchApiService = inject(WatchApiService);
  private readonly snackbarService = inject(SnackBarService);

  async getAllWatches() {
    this._watches.set(await lastValueFrom(this.watchApiService.getAllWatches()));
  }

  async deleteWatch(watch: Watch, deleteFromDatabase: boolean) {
    if (deleteFromDatabase) {
      const deleteId = await lastValueFrom(this.watchApiService.deleteWatchById(watch.id));

      if (errorMessageConst in deleteId) {
        return;
      }
    }

    this._watches.update((watches) => watches.filter((w) => w.id !== watch.id));
  }

  addWatch(watch: Watch) {
    this._watches.update((watches) => [...watches, watch].sort((a, b) => Date.parse(a.added.toString()) - Date.parse(b.added.toString())));
  }

  async saveNewWatch(newWatchDTO: NewWatchFormDTO) {
    const newWatch = await lastValueFrom(this.watchApiService.saveNewWatch(newWatchDTO)).catch((err: ApiError) => err);

    if (errorMessageConst in newWatch) {
      return newWatch;
    }

    this.snackbarService.successSnackBar(`Ny bevakning skapad för: ${newWatchDTO.label}`);
    this._watches.update((watches) => [...watches, newWatch]);

    return newWatch;
  }

  async toggleActiveStatus(watch: Watch) {
    const { active, id, label } = watch;
    const updatedWatch = await lastValueFrom(this.watchApiService.toggleActiveStatus({ active, id, label })).catch((err: ApiError) => err);

    if (errorMessageConst in updatedWatch) {
      this._watches.set(structuredClone(this._watches()));
      return;
    }

    this.snackbarService.successSnackBar(`${updatedWatch.label} är ${updatedWatch.active ? "aktiv" : " inaktiv"}`);

    this._watches.update((watches) =>
      watches.map((watch) => {
        if ((watch.active = updatedWatch.active)) {
          watch.id = updatedWatch.id;
        }

        return watch;
      }),
    );
  }
}
