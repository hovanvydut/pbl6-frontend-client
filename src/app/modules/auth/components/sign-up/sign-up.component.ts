import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

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
      return this.signUp.password.hasError('minLength') ? 'Please enter password min length 6' : '';
    }
    return null;
  }

  onSignUpButtonClicked() {
    this.router.navigateByUrl(ENDPOINTS.LOGIN).then();
  }

}
