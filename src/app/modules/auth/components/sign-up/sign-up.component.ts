import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { AuthService } from './../../services/auth.service';
import { AppNotify } from './../../../../shared/utilities/notification-helper';
import { RegisterAccountModel } from '../../models/auth.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  };

  signUpInfo: RegisterAccountModel = new RegisterAccountModel();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  getErrorMessage(type) {
    if (type === 'email') {
      if (this.signUp.email.hasError('required')) {
        return 'You must enter a value';
      }
      return this.signUp.email.hasError('email') ? 'Not a valid email' : '';
    }
    if (type === 'password') {
      if (this.signUp.password.hasError('required')) {
        return 'You must enter a value';
      }
      return this.signUp.password.hasError('minLength')
        ? 'Please enter password min length 6'
        : '';
    }
    return null;
  }

  onSignUpButtonClicked() {
    this.authService.login(this.signUp).subscribe(
      res => {
        if (res) {
          this.router.navigateByUrl(ENDPOINTS.LOGIN).then();
        }
      },
      err => {
        AppNotify.error('Có lỗi xảy ra, vui lòng thử lại!');
      }
    );
  }
}
