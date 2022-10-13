import { Component, OnInit } from '@angular/core';
import { SIDEBAR_GROUP_NAME } from '@app/shared/app.constants';
import { ENDPOINTS } from '@app/shared/utilities';
//
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  SIDEBAR_GROUP_NAME = SIDEBAR_GROUP_NAME;
  // icon

  menuItems = [
    {
      name: SIDEBAR_GROUP_NAME.Dashboard,
      items: [
        {
          icon: 'home',
          name: 'Dashboard',
          link: ENDPOINTS.DASHBOARD
        },
        {
          icon: 'product',
          name: 'Quản lý bài đăng',
          link: ENDPOINTS.MANAGE_POSTS
        },
        {
          icon: 'chart_vertical',
          name: 'Thống kê',
          link: ENDPOINTS.STATISTICS
        },
        {
          icon: 'billing',
          name: 'Nạp tiền',
          link: ENDPOINTS.COIN
        },
        {
          icon: 'messages',
          name: 'Lịch hẹn xem trọ',
          link: ENDPOINTS.BOOKING_CALENDAR
        },
      ]
    },
  ];

  constructor() {}

  ngOnInit() {}
}
