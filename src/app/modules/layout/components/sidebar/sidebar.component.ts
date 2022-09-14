import { Component, OnInit } from '@angular/core';
//
import { svgBilling, svgChartVertical, svgHome, svgSetting, svgUser,svgCart, svgWallet, svgProduct } from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // icon
  svgHome = svgHome;
  svgBilling = svgBilling;
  svgSetting = svgSetting;
  svgUser = svgUser;
  svgCart = svgCart;
  svgChartVertical = svgChartVertical;
  svgWallet = svgWallet;
  svgProduct = svgProduct;

  menuItems = [
    {
      name: 'Dashboard',
      items: [
        {
          icon: this.svgCart,
          name: 'Shopping',
          link: '/product'
        },
      ]
    },
    {
      name: 'General',
      items: [
        {
          icon: this.svgHome,
          name: 'Home',
          link: '/profile/home'
        },
        {
          icon: this.svgBilling,
          name: 'Billing',
          link: '/billing'
        },
        {
          icon: this.svgSetting,
          name: 'Settings',
          link: '/profile/settings'
        },

      ]
    },
    {
      name: 'Manage Account',
      items: [
        {
          icon: this.svgUser,
          name: 'Profile',
          link: '/profile'
        },
      ]
    },
    {
      name: 'Admin Features',
      items: [
        {
          icon: this.svgProduct,
          name: 'Products',
          link: '/seller/products'
        },
        {
          icon: this.svgChartVertical,
          name: 'Chart',
          link: '/chart'
        }
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
