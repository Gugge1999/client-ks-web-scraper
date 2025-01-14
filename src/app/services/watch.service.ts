import { inject, Injectable, signal } from "@angular/core";
import { lastValueFrom, take } from "rxjs";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";
import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { WatchApiService } from "@services/watch-api.service";
import { AlertService } from "@services/alert.service";

@Injectable({
  providedIn: "root",
})
export class WatchService {
  private readonly _watches = signal<Watch[]>([]);
  readonly watches = this._watches.asReadonly();

  private readonly watchApiService = inject(WatchApiService);
  private readonly alertService = inject(AlertService);

  // TODO: Lägg till resource loading i template för att visa att bevakningar laddar
  // private readonly hejsan = this.watchApiService.getAllWatchesResource;
  //
  // desserts = computed(() => this.hejsan.value() ?? []);

  getAllWatches() {
    // Värdet från den här returneras inte. Därför används inte promise. Byt till resource sen
    this.watchApiService
      .getAllWatches()
      .pipe(take(1))
      .subscribe(res => {
        if (STACK_API_ERROR_PROPERTY in res) {
          return;
        }

        this._watches.set(res);
      });
  }

  deleteWatch(watch: Watch) {
    this._watches.update(watches => watches.filter(w => w.id !== watch.id));
  }

  addWatch(watch: Watch) {
    this._watches.update(watches => {
      return [...watches, watch].sort((a, b) => Date.parse(a.added.toString()) - Date.parse(b.added.toString()));
    });
  }

  async saveNewWatch(newWatchDTO: NewWatchFormDTO) {
    const apiRes = await lastValueFrom(this.watchApiService.saveNewWatch(newWatchDTO)).catch((err: ApiError) => err);

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      return apiRes;
    }

    this.alertService.successAlert(`Ny bevakning skapad för: ${newWatchDTO.label}`);
    this._watches.update(watches => [...watches, apiRes]);

    return apiRes;
  }

  async toggleAll(activateAll: boolean, ids: string[]) {
    const apiRes = await lastValueFrom(this.watchApiService.toggleAll(activateAll, ids)).catch((err: ApiError) => err);

    if (STACK_API_ERROR_PROPERTY in apiRes) {
      return;
    }

    this.alertService.successAlert((activateAll ? `Aktiverade` : `Inaktiverade`) + ` Alla bevakningar`);
    const newWatches = this.watches().map(watch => {
      watch.active = activateAll;
      return watch;
    });

    this._watches.set(newWatches);
    return apiRes;
  }

  async toggleActiveStatus(watch: Watch) {
    const newActiveStatus = watch.active;

    // TODO: Om något får fel ska bevakningen gå tillbaka till den gamla statusen
    this._watches.update(watches =>
      watches.map(w => {
        if (w.id === watch.id) {
          w.active = !watch.active;
        }

        return w;
      }),
    );

    const { id, label } = watch;
    const res = await lastValueFrom(this.watchApiService.toggleActiveStatus({ active: newActiveStatus, id, label })).catch(
      (err: ApiError) => err,
    );

    if (STACK_API_ERROR_PROPERTY in res) {
      return;
    }

    this.alertService.infoAlert(`${res.active ? "Aktivera:" : "Inaktivera:"} ${res.label}`);
  }
}
