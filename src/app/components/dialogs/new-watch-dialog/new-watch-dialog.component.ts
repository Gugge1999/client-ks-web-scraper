import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { errorMessageConst } from "@constants/constants";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { WatchForm } from "@models/forms/watch-form";
import { WatchService } from "@services/watch.service";

@Component({
  selector: "scraper-new-watch-dialog",
  templateUrl: "./new-watch-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./new-watch-dialog.component.scss",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class NewWatchDialogComponent {
  watchForm = new FormGroup<WatchForm>({
    label: new FormControl("", { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
    watchToScrape: new FormControl("", { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
  });

  private readonly watchService = inject(WatchService);
  private readonly dialogRef = inject(MatDialogRef<NewWatchDialogComponent>);
  private readonly cdr = inject(ChangeDetectorRef);

  protected async submitNewWatch() {
    const wordsSeparatedByPlus = this.watchForm.controls.watchToScrape.value.trim().replace(/\s+/g, "+");

    const replaceThreadString = "https://klocksnack.se/search/1/?q=REPLACE-ME&t=post&c[child_nodes]=1&c[nodes][0]=11&c[title_only]=1&o=date";

    const newWatch: NewWatchFormDTO = {
      label: this.watchForm.controls.label.value,
      watchToScrape: replaceThreadString.replace("REPLACE-ME", wordsSeparatedByPlus),
    };

    const result = await this.watchService.saveNewWatch(newWatch);

    if (errorMessageConst in result) {
      this.watchForm.controls.watchToScrape.setErrors({ noResult: true });

      this.cdr.markForCheck();
      return;
    }

    this.dialogRef.close(result);
  }

  cancelClicked() {
    this.dialogRef.close();
  }

  protected onClear(formControl: FormControl<string>) {
    formControl.patchValue("");
  }
}
