import { BehaviorSubject, Observable } from 'rxjs';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ProgessBarComponent } from '@components/progress-bar/progress-bar.component';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private overlayRef!: OverlayRef;
  private progessBarMessage$ = new BehaviorSubject<string>('');

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

    this.progessBarMessage$.next(message);

    // Create ComponentPortal that can be attached to a PortalHost
    const progressBarOverlayPortal = new ComponentPortal(ProgessBarComponent);
    this.overlayRef.attach(progressBarOverlayPortal);
  }

  // TODO: Varför två !! ?
  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  public get progessBarMessage(): Observable<string> {
    return this.progessBarMessage$.asObservable();
  }
}
