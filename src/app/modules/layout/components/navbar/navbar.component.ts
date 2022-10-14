import { Component, OnInit } from '@angular/core';
import { svgNotification, svgMessage, svgArrowDown, svgCart } from 'src/assets/images/svg-icons.constants';
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  svgNotification = svgNotification;
  svgMessage = svgMessage;
  svgArrowDown = svgArrowDown;
  svgCart = svgCart;

  menuItems = [
    {
      icon: 'home',
      name: 'Dashboard',
      link: ENDPOINTS.DASHBOARD
    },
    {
      icon: 'product',
      name: 'Quản lý bài đăng',
      link: ENDPOINTS.LANDLOR_MANAGE_POSTS
    },
    {
      icon: 'billing',
      name: 'Nạp tiền',
      link: ENDPOINTS.USER_COIN
    },
    {
      icon: 'messages',
      name: 'Lịch hẹn xem trọ',
      link: ENDPOINTS.USER_BOOKING_CALENDAR
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
