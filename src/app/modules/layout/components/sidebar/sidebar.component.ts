import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '@app/shared/utilities';
//
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  menuItems = [
    {
      name: 'Dashboard',
      items: [
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
          icon: 'chart_vertical',
          name: 'Thống kê',
          link: ENDPOINTS.LANDLOR_STATISTICS
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
        {
          icon: 'logout',
          name: 'Đăng xuất',
          link: ENDPOINTS.LOGOUT
        },
      ]
    },
  ];

  constructor() {}

  ngOnInit() {}
}
