import { Injectable, effect, signal } from "@angular/core";
import { lastValueFrom, tap } from "rxjs";

import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { WatchApiService } from "@services/watch-api.service";
import { SnackbarService } from "./snackbar.service";

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
      lastValueFrom(this.watchApiService.deleteWatchById(watch.id));
    }

    this._watches.set(this._watches().filter((w) => w.id !== watch.id));
  }

  async addWatch(watch: NewWatchFormDTO | Watch) {
    let newWatch: Watch;

    if ("id" in watch) {
      newWatch = watch;
      this._watches.update((watches) => [...watches, newWatch].sort((a, b) => Date.parse(a.added.toString()) - Date.parse(b.added.toString())));
    } else {
      newWatch = await lastValueFrom(
        this.watchApiService.addNewWatch(watch).pipe(tap(() => this.snackbarService.successSnackbar(`Added watch with label: ${watch.label}`))),
      );
      this._watches.update((watches) => [...watches, newWatch]);
    }
  }

  async toggleActiveStatus(watch: Watch) {
    const oldStatus = watch.active;

    console.log(this._watches());

    await lastValueFrom(
      this.watchApiService.toggleActiveStatus(watch).pipe(
        tap({
          next: (res) => {
            this.snackbarService.successSnackbar(`Toggled status on: ${res.label}`);
          },
          error: () => {
            this._watches.update((w) => w.map((item) => (item.id === watch.id ? { ...watch, active: oldStatus } : item)));
            console.log(this.watches());
          },
        }),
      ),
    );
  }
}
