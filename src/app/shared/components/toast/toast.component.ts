import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  // And then these ⤵
  animations: [
    trigger('toastTrigger', [
      // This refers to the @trigger we created in the template
      state('open', style({ transform: 'translateX(0%)' })), // This is how the 'open' state is styled
      state('close', style({ transform: 'translateX(200%)' })), // This is how the 'close' state is styled
      transition('open <=> close', [
        // This is how they're expected to transition from one to the other
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ToastComponent {
  toastMessage = 'This is a toast'; // This is the string the template is already bound to
  showsToast = false; // This is what toggles the component to show or hide
  toastClass = ['toast-class'];

  constructor(public toast: NotifyService) {
    
  }

  dismiss(): void {    
    this.toast.dismissToast();  
  }
}
