import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { AuthService } from './../../services/auth.service';
import { RegisterAccountModel } from '../../models/auth.model';
import { isEqual } from 'lodash-es';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required])
  };
  signUpInfo: RegisterAccountModel = new RegisterAccountModel();
  errorMessage: string;
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  getErrorMessage(type) {
    if (type === 'email') {
      if (this.signUp.email.hasError('required')) {
        return 'Hãy nhập email của bạn!';
      }
      return this.signUp.email.hasError('email') ? 'Sai định dạng email' : '';
    }

    if (type === 'password') {
      if (this.signUp.password.hasError('required')) {
        return 'Hãy nhập mật khẩu!';
      }
      return this.signUp.password.hasError('minLength')
        ? 'Mật khẩu phải dài hơn 6 kí tự!'
        : '';
    }

    if (type === 'confirmPassword') {
      if (this.signUp.confirmPassword.hasError('required')) {
        return 'Hãy xác nhận mật khẩu!';
      }
    }
    return null;
  }

  onSignUpButtonClicked() {
    if (
      !isEqual(this.signUp.password.value, this.signUp.confirmPassword.value)
    ) {
      this.notify('Mật khẩu không khớp!');
      return;
    }

    if (
      this.signUp.email.invalid ||
      this.signUp.password.invalid ||
      this.signUp.confirmPassword.invalid
    ) {
      this.notify('Hãy nhập đầy đủ thông tin!');
      return;
    }

    if (
      this.signUp.email.valid &&
      this.signUp.password.valid &&
      this.signUp.confirmPassword.valid
    ) {
      this.signUpInfo = new RegisterAccountModel({
        email: this.signUp.email.value,
        password: this.signUp.password.value,
        displayName: this.signUp.displayName.value,
        address: 'Hà Nội',
        addressWardId: '1',
        identityNumber:  Math.floor(Math.random() * 1000000000) + '1',
        phoneNumber: Math.floor(Math.random() * 1000000000) + '1',
        roleId: '1'
      });
      this.authService.register(this.signUpInfo).subscribe(res => {
        if( res.success) {
          this.notify(
            'Đăng ký thành công! Hãy kiểm tra email để xác nhận tài khoản trước khi đăng nhập!'
          );
          this.router.navigate([ENDPOINTS.LOGIN]);
        } else {
          this.notify('Đăng ký thất bại!');
          this.errorMessage = res.Message;
        }
      });

      // random phone number
    }
  }

  notify(message) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }
}
