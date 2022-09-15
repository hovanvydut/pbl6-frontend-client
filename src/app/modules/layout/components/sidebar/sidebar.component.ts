import { Component, OnInit } from '@angular/core';
import { SIDEBAR_GROUP_NAME } from '@app/shared/app.constants';
import { ENDPOINTS } from '@app/shared/utilities';
//
import {
  svgBilling,
  svgChartVertical,
  svgHome,
  svgSetting,
  svgUser,
  svgShoppingCart,
  svgWallet,
  svgProduct
} from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  SIDEBAR_GROUP_NAME = SIDEBAR_GROUP_NAME;
  // icon
  svgHome = svgHome;
  svgBilling = svgBilling;
  svgSetting = svgSetting;
  svgUser = svgUser;
  svgShoppingCart = svgShoppingCart;
  svgChartVertical = svgChartVertical;
  svgWallet = svgWallet;
  svgProduct = svgProduct;

  menuItems = [
    {
      name: SIDEBAR_GROUP_NAME.Dashboard,
      items: [
        {
          icon: this.svgShoppingCart,
          name: 'Shopping',
          link: ENDPOINTS.DASHBOARD
        }
      ]
    },
    {
      name: SIDEBAR_GROUP_NAME.General,
      items: [
        {
          icon: this.svgHome,
          name: 'Orders',
          link: ENDPOINTS.BUYER_ORDERS
        },
        {
          icon: this.svgBilling,
          name: 'Billings',
          link: ENDPOINTS.BUYER_BILLINGS
        }
      ]
    },
    {
      name: SIDEBAR_GROUP_NAME.SellerFeatures,
      items: [
        {
          icon: this.svgChartVertical,
          name: 'Orders',
          link: ENDPOINTS.SELLER_ORDERS
        },
        {
          icon: this.svgChartVertical,
          name: 'General',
          link: ENDPOINTS.SELLER_GENERAL
        },
        {
          icon: this.svgProduct,
          name: 'Products',
          link: ENDPOINTS.SELLER_PRODUCTS
        }
      ]
    },
    {
      name: SIDEBAR_GROUP_NAME.AccountSetting,
      items: [
        {
          icon: this.svgUser,
          name: 'Profile',
          link: ENDPOINTS.BUYER_PROFILE_INFO
        },
        {
          icon: this.svgSetting,
          name: 'Settings',
          link: ENDPOINTS.BUYER_PROFILE_SETTINGS
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
