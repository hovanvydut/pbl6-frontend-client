import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { svgMessages, svgLock } from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }
  hidePwd: boolean = true;

  svgMessages = svgMessages;
  svgLock = svgLock;

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
    return this.login.password.hasError('minLength') ? 'Please enter password min length 6' : '';
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSignInButtonClicked() {
    this.router.navigateByUrl(ENDPOINTS.DASHBOARD).then();
  }
}
