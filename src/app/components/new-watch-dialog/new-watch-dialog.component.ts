import { Component, inject, signal } from "@angular/core";
import { injectContext } from "@taiga-ui/polymorpheus";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { WatchForm } from "@models/forms/watch-form";
import { Watch } from "@models/watch.model";
import { WatchService } from "@services/watch.service";
import { TuiButton, TuiDialogContext, TuiError, TuiTextfield } from "@taiga-ui/core";
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { AsyncPipe } from "@angular/common";
import { STACK_API_ERROR_PROPERTY } from "@constants/constants";

@Component({
  selector: "scraper-new-watch-dialog",
  templateUrl: "./new-watch-dialog.component.html",
  imports: [FormsModule, ReactiveFormsModule, TuiError, TuiFieldErrorPipe, AsyncPipe, TuiButton, TuiButtonLoading, TuiTextfield],
  providers: [
    tuiValidationErrorsProvider({
      required: "Obligatorisk",
      noResult: "Klocka gav inget resultat",
      // OBS: Variabel måste heta requiredLength
      minlength: ({ requiredLength }: { requiredLength: string }) => `Minst ${requiredLength} tecken`,
    }),
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

  readonly newWatchLoading = signal(false);

  protected async submitNewWatch() {
    this.newWatchLoading.set(true);

    const wordsSeparatedByPlus = this.watchForm.controls.watchToScrape.value.trim().replace(/\s+/g, "+");

    const newWatch: NewWatchFormDTO = {
      label: this.watchForm.getRawValue().label,
      watchToScrape: wordsSeparatedByPlus,
    };

    const result = await this.watchService.saveNewWatch(newWatch);

    this.newWatchLoading.set(false);

    if (STACK_API_ERROR_PROPERTY in result) {
      this.watchForm.controls.watchToScrape.setErrors({ noResult: true });

      return;
    }

    this.context.completeWith(result);
  }

  cancelClicked() {
    this.context.completeWith(undefined);
  }
}
