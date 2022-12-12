import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

// Add this constant ⤵
export const TOAST_STATE = {
  success: 'success-toast',
  warning: 'warning-toast',
  danger: 'danger-toast'
};

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  // The boolean that drives the toast's 'open' vs. 'close' behavior
  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // The message string that'll bind and display on the toast  ﻿.
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  // The state that will add a style class to the component  ﻿.
  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(
    TOAST_STATE.success
  );

  constructor(public snackBar: MatSnackBar) {}

  public notify(message: string, time: number = 2000) {
    this.snackBar.open(message, '', {
      duration: time
    });
  }

  showToast(toastMsg: string, dismissTime?: number): void {
    // Observables use '.next()' to indicate what they want done with observable
    // This will update the toastState to the toastState passed into the function
    // this.toastState$.next(toastState);

    // This updates the toastMessage to the toastMsg passed into the function
    this.toastMessage$.next(toastMsg);

    // This will update the showsToast trigger to 'true'
    this.showsToast$.next(true);

    if(dismissTime) {
      this.dismissToastTime(dismissTime);
    }
  }

  // This updates the showsToast behavioursubject to 'false'
  dismissToast(): void {
    this.showsToast$.next(false);
  }

  private dismissToastTime(time): void {
    setTimeout(() => {
      this.dismissToast();
    }, time);
  }
}
