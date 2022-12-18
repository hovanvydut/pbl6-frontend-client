import { ENDPOINTS } from './../../../../shared/utilities/endpoints';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifyService } from '@app/shared/services/notify.service';
import { isEqual } from 'lodash-es';
import { AuthService } from '../../services/auth.service';
import { RecoverPasswordModel } from '../../models/auth.model';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  recoverPassword = new RecoverPasswordModel();
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.recoverPassword = new RecoverPasswordModel({
          userId: parseInt(this.route.snapshot.queryParamMap.get('userId')),
          code: this.route.snapshot.queryParamMap.get('code')
        });
      }
    });
  }

  ngOnInit() {}

  getErrorMessage(type) {
    if (type === 'password') {
      if (this.password.hasError('required')) {
        return 'Hãy nhập mật khẩu!';
      }
      return this.password.hasError('minLength')
        ? 'Mật khẩu phải dài hơn 6 kí tự!'
        : '';
    }

    if (type === 'confirmPassword') {
      if (this.confirmPassword.hasError('required')) {
        return 'Hãy xác nhận mật khẩu!';
      }
    }
    return null;
  }

  onCreateNewPwdButtonClicked() {
    if (!isEqual(this.password.value, this.confirmPassword.value)) {
      this.notifyService.notify('Mật khẩu không khớp!');
      return;
    }

    if (this.password.invalid || this.confirmPassword.invalid) {
      this.notifyService.notify('Hãy nhập đầy đủ thông tin!');
      return;
    }

    if (this.password.valid && this.confirmPassword.valid) {
      this.recoverPassword.newPassword = this.password.value;
      this.authService.recoverPassword(this.recoverPassword).subscribe(
        res => {
          this.notifyService.notify('Đổi mật khẩu thành công!');
          this.router.navigate([ENDPOINTS.LOGIN]);
        },
        error => {
          this.notifyService.notify('Đổi mật khẩu thất bại!');
          this.errorMessage = error;
        }
      );
    }
  }
}
