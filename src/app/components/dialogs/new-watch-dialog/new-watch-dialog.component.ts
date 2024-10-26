import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { errorMessageConst } from "@constants/constants";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { WatchForm } from "@models/forms/watch-form";
import { WatchService } from "@services/watch.service";
import { TuiInputModule, TuiTextfieldControllerModule } from "@taiga-ui/legacy";
import { TuiButton, TuiDialogContext, TuiError, TuiHint, TuiTextfield } from "@taiga-ui/core";
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from "@taiga-ui/kit";
import { AsyncPipe } from "@angular/common";
import { injectContext } from "@taiga-ui/polymorpheus";
import { Watch } from "@models/watch.model";

@Component({
  selector: "scraper-new-watch-dialog",
  templateUrl: "./new-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiTextfieldControllerModule,
    TuiButton,
    TuiHint,
    TuiTextfield,
  ],
  providers: [
    tuiValidationErrorsProvider({
      required: "Obligatorisk",
      noResult: "Gav inget resultat",
      minlength: ({ requiredLength }: { requiredLength: string }) => `Minst ${requiredLength} tecken`,
    }),
  ],
})
export class NewWatchDialogComponent {
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

  public readonly context = injectContext<TuiDialogContext<Watch | undefined, void>>();
  private readonly watchService = inject(WatchService);

  protected async submitNewWatch() {
    const wordsSeparatedByPlus = this.watchForm.controls.watchToScrape.value.trim().replace(/\s+/g, "+");

    const newWatch: NewWatchFormDTO = {
      label: this.watchForm.getRawValue().label,
      watchToScrape: `https://klocksnack.se/search/1/?q=${wordsSeparatedByPlus}&t=post&c[child_nodes]=1&c[nodes][0]=11&c[title_only]=1&o=date`,
    };

    const result = await this.watchService.saveNewWatch(newWatch);

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
