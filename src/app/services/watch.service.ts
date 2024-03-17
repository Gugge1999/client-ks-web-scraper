import { Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";

import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { ValidationError } from "@models/DTOs/validation-error.dto";
import { Watch } from "@models/watch.model";
import { SnackbarService } from "@services/snackbar.service";
import { WatchApiService } from "@services/watch-api.service";

@Injectable({
  providedIn: "root",
})
export class WatchService {
  private _watches = signal<Watch[]>([]);
  readonly watches = this._watches.asReadonly();

  constructor(
    private watchApiService: WatchApiService,
    private snackbarService: SnackbarService,
  ) {}

  async getAllWatches() {
    this._watches.set(await lastValueFrom(this.watchApiService.getAllWatchesApi()));
  }

  async deleteWatch(watch: Watch, deleteFromDatabase = true) {
    if (deleteFromDatabase) {
      await lastValueFrom(this.watchApiService.deleteWatchById(watch.id));
    }

    this._watches.update((watches) => watches.filter((w) => w.id !== watch.id));
  }

  async addWatch(watch: Watch) {
    this._watches.update((watches) => [...watches, watch].sort((a, b) => Date.parse(a.added.toString()) - Date.parse(b.added.toString())));
  }

  async saveNewWatch(newWatch: NewWatchFormDTO) {
    this.watchApiService.newWatchLoading.set(true);
    const result = await lastValueFrom(this.watchApiService.saveNewWatch(newWatch)).catch((err: ValidationError) => err);

    if ("errorMessage" in result) {
      return result;
    }

    this.snackbarService.successSnackbar(`Added watch with label: ${newWatch.label}`);
    this._watches.update((watches) => [...watches, result]);
    this.watchApiService.newWatchLoading.set(false);

    return result;
  }

  // TODO: ska inte värdet uppdateras?
  async toggleActiveStatus(watch: Watch) {
    await lastValueFrom(this.watchApiService.toggleActiveStatus(watch)).then((res) =>
      this.snackbarService.infoSnackbar(`Toggled status on: ${res.label}`),
    );
  }
}
