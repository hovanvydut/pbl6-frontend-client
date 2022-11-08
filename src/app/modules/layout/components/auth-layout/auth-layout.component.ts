import { Component, OnInit } from '@angular/core';
import { DEFAULT_IMAGES } from '@app/shared/app.constants';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  DEFAULT_IMAGES = DEFAULT_IMAGES;
  constructor() { }

  ngOnInit() {
  }

}
