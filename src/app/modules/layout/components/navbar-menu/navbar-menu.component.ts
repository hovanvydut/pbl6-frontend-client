import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '@app/shared/utilities';
//

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {
  menu = [
    {
      name: 'Trang chủ',
      link: ENDPOINTS.HOME,
    },
    {
      name: 'Giới thiệu',
      link: '/introduction',

    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
