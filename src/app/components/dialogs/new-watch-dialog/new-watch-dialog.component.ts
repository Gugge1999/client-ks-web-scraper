import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { errorMessageConst } from "@constants/constants";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { WatchForm } from "@models/forms/watch-form";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";
import { TuiButton, TuiDialogContext, TuiError, TuiHint, TuiTextfield } from "@taiga-ui/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "scraper-new-watch-dialog",
  templateUrl: "./new-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiValidationErrorsProvider({
      required: "Obligatorisk",
      noResult: "Klocka gav inget resultat",
      // OBS: Variable måste heta requiredLength
      minlength: ({ requiredLength }: { requiredLength: string }) => `Minst ${requiredLength} tecken`,
    }),
  ],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiButton,
    TuiButtonLoading,
    TuiHint,
    TuiTextfield,
  ],
})
export class NewWatchDialogComponent {
  public readonly context = injectContext<TuiDialogContext<Watch | undefined, void>>();
  private readonly watchService = inject(WatchService);

  watchForm = new FormGroup<WatchForm>({
    label: new FormControl("", {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    watchToScrape: new FormControl("", {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
  });

  newWatchLoading = signal(false);

  protected async submitNewWatch() {
    this.newWatchLoading.set(true);

    const wordsSeparatedByPlus = this.watchForm.controls.watchToScrape.value.trim().replace(/\s+/g, "+");

    const newWatch: NewWatchFormDTO = {
      label: this.watchForm.getRawValue().label,
      watchToScrape: `https://klocksnack.se/search/1/?q=${wordsSeparatedByPlus}&t=post&c[child_nodes]=1&c[nodes][0]=11&c[title_only]=1&o=date`,
    };

    const result = await this.watchService.saveNewWatch(newWatch);

    this.newWatchLoading.set(false);

    if (errorMessageConst in result) {
      this.watchForm.controls.watchToScrape.setErrors({ noResult: true });

      return;
    }

    this.context.completeWith(result);
  }

  cancelClicked() {
    this.context.completeWith(undefined);
  }
}
