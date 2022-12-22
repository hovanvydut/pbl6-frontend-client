import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@app/shared/services/notify.service';
import { ENDPOINTS } from '@app/shared/utilities';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  isVerifying: boolean = true;
  isConfirmed: boolean = false;

  userId: number = 0;
  code: string = '';

  constructor(
    private notifyService: NotifyService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.userId = parseInt(params['userId']);
      this.code = params['code'];
    });
  }

  ngOnInit() {
    this.handleConfirmEmail();
  }

  handleConfirmEmail() {
    if (this.userId && this.code && this.isVerifying) {
      const data = {
        userId: this.userId,
        code: this.code
      };
      this.authService.confirmEmail(data).subscribe(
        res => {
          this.isVerifying = false;
          this.isConfirmed = true;
        },
        err => {
          this.notifyService.notify(err);
          this.isVerifying = false;
          this.isConfirmed = false;
        }
      );
    }
  }
}
