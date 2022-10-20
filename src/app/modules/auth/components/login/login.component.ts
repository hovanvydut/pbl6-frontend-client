import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { AuthService } from '../../services/auth.service';
import { AppNotify } from './../../../../shared/utilities/notification-helper';
import { BaseService } from '@app/core/services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private baseService: BaseService
  ) {}

  ngOnInit() {}

  getEmailErrorMessage() {
    if (this.login.email.hasError('required')) {
      return 'Hãy nhập email của bạn!';
    }
    return this.login.email.hasError('email') ? 'Sai định dạng email' : '';
  }

  getPasswordErrorMessage() {
    if (this.login.password.hasError('required')) {
      return 'Hãy nhập mật khẩu!';
    }
    return this.login.password.hasError('minLength')
      ? 'Mật khẩu phải dài hơn 6 kí tự!'
      : '';
  }

  onSignInButtonClicked() {
    this.errorMessage = '';
    let data: any = {};
    data.email = this.login.email.value;
    data.password = this.login.password.value;
    this.authService.login(data).subscribe(res => {
      if (res.success) {
        this.baseService.storeLoggedUser(res.data);
        this.baseService.storeToken(res.data.accessToken);
        this.router.navigateByUrl(ENDPOINTS.HOME).then();
      } else {
        this.notify(res.message);
        this.errorMessage = res.message;
      }
    });
  }

  notify(message) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }
}
