import { BehaviorSubject, Observable } from 'rxjs';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ProgessBarComponent } from '@app/components/progress-bar/progress-bar.component';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarOverlayService {
  private overlayRef!: OverlayRef;
  private progessBarMessageSubject = new BehaviorSubject<string>('');

  constructor(private overlay: Overlay) {}

  public show(message: string = '') {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
    }

    this.progessBarMessageSubject.next(message);

    // Create ComponentPortal that can be attached to a PortalHost
    const progressBarOverlayPortal = new ComponentPortal(ProgessBarComponent);
    this.overlayRef.attach(progressBarOverlayPortal);
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  public get progessBarMessage(): Observable<string> {
    return this.progessBarMessageSubject.asObservable();
  }
}
