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
          icon: 'shopping_cart',
          name: 'Shopping',
          link: ENDPOINTS.DASHBOARD
        }
      ]
    },
    {
      name: SIDEBAR_GROUP_NAME.General,
      items: [
        {
          icon: 'home',
          name: 'Orders',
          link: ENDPOINTS.BUYER_ORDERS
        },
        {
          icon: 'billing',
          name: 'Billings',
          link: ENDPOINTS.BUYER_BILLINGS
        }
      ]
    },
    {
      name: SIDEBAR_GROUP_NAME.SellerFeatures,
      items: [
        {
          icon: 'chart_vertical',
          name: 'Orders',
          link: ENDPOINTS.SELLER_ORDERS
        },
        {
          icon: 'chart_vertical',
          name: 'General',
          link: ENDPOINTS.SELLER_GENERAL
        },
        {
          icon: 'product',
          name: 'Products',
          link: ENDPOINTS.SELLER_PRODUCTS
        }
      ]
    },
    {
      name: SIDEBAR_GROUP_NAME.AccountSetting,
      items: [
        {
          icon: 'user',
          name: 'Profile',
          link: ENDPOINTS.BUYER_PROFILE_INFO
        },
        {
          icon: 'setting',
          name: 'Seller Profile',
          link: ENDPOINTS.SELLER_PROFILE_INFO
        },
        {
          icon: 'setting',
          name: 'Settings',
          link: ENDPOINTS.BUYER_PROFILE_SETTINGS
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
