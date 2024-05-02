import { Injectable, inject, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";

import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { errorMessageConst } from "@models/constants";
import { Watch } from "@models/watch.model";
import { SnackbarService } from "@services/snackbar.service";
import { WatchApiService } from "@services/watch-api.service";

@Injectable({
  providedIn: "root",
})
export class WatchService {
  private _watches = signal<Watch[]>([]);
  readonly watches = this._watches.asReadonly();

  private readonly watchApiService = inject(WatchApiService);
  private readonly snackbarService = inject(SnackbarService);

  async getAllWatches() {
    this._watches.set(await lastValueFrom(this.watchApiService.getAllWatchesApi()));
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

  async addWatch(watch: Watch) {
    this._watches.update((watches) => [...watches, watch].sort((a, b) => Date.parse(a.added.toString()) - Date.parse(b.added.toString())));
  }

  async saveNewWatch(newWatchDTO: NewWatchFormDTO) {
    const newWatch = await lastValueFrom(this.watchApiService.saveNewWatch(newWatchDTO)).catch((err: ApiError) => err);

    if (errorMessageConst in newWatch) {
      return newWatch;
    }

    this.snackbarService.successSnackbar(`Added watch with label: ${newWatchDTO.label}`);
    this._watches.update((watches) => [...watches, newWatch]);

    return newWatch;
  }

  async toggleActiveStatus(watch: Watch) {
    const { active, id } = watch;
    const updatedWatch = await lastValueFrom(this.watchApiService.toggleActiveStatus({ active, id })).catch((err: ApiError) => err);

    if (errorMessageConst in updatedWatch) {
      this._watches.set(structuredClone(this._watches()));
      return;
    }

    this.snackbarService.infoSnackbar(`Toggled status on: ${updatedWatch.label}`);

    this._watches.update((watches) =>
      watches.map((watch) => {
        watch.id === updatedWatch.id ? (watch.active = updatedWatch.active) : null;
        return watch;
      }),
    );
  }
}
