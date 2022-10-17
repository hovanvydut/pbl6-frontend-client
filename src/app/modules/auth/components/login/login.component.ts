import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { AuthService } from '../../services/auth.service';
import { AppNotify } from './../../../../shared/utilities/notification-helper';
import { BaseService } from '@app/core/services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  };
  errorMessage: string;
  hidePwd: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private baseService: BaseService
  ) {}

  ngOnInit() {}

  getEmailErrorMessage() {
    if (this.login.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.login.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.login.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.login.password.hasError('minLength')
      ? 'Please enter password min length 6'
      : '';
  }

  onSignInButtonClicked() {
    let data: any = {};
    data.login = this.login.email.value;
    data.password = this.login.password.value;
    this.authService.login(data).subscribe(res => {
      if (res.Success) {
        this.baseService.storeLoggedUser(res);
        this.router.navigateByUrl(ENDPOINTS.HOME).then();
        // TODO: save user data to local storages
      } else {
        AppNotify.error(res.Message);
        this.errorMessage = res.Message;
      }
    });
  }
}
