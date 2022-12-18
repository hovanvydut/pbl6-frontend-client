import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotifyService } from '@app/shared/services/notify.service';
import { ENDPOINTS } from '@app/shared/utilities';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage: string;
  isRecoverSent: boolean = false;

  constructor(
    private notifyService: NotifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Hãy nhập email của bạn!';
    }
    return this.email.hasError('email') ? 'Sai định dạng email' : '';
  }

  onForgotPwdButtonClicked() {
    this.errorMessage = '';
    this.authService.forgotPassword(this.email.value).subscribe(
      res => {
        this.isRecoverSent = true;
      },
      err => {
        this.notifyService.notify(err);
        this.errorMessage = err.message;
      }
    );
  }
}
