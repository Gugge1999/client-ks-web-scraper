import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { ProgessBarComponent } from "@components/progress-bar/progress-bar.component";

@Injectable({
  providedIn: "root",
})
export class ProgressBarService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  public show() {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
      });
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const progressBarOverlayPortal = new ComponentPortal(ProgessBarComponent);

    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(progressBarOverlayPortal);
    }
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
