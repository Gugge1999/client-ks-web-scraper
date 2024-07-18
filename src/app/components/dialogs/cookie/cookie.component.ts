import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { CookieState } from "@models/cookie";

@Component({
  selector: "scraper-cookie",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: "./cookie.component.html",
  styleUrl: "./cookie.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieComponent {
  private readonly dialogRef = inject(MatDialogRef<CookieComponent>);

  accept = () => this.dialogRef.close(CookieState.Accepted);

  reject = () => this.dialogRef.close(CookieState.Rejected);
}
