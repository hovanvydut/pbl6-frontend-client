import { Component, OnInit } from '@angular/core';
//
import { svgBilling, svgChartVertical, svgHome, svgSetting, svgUser } from 'src/assets/images/svg-icons.constants';

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
  svgChartVertical = svgChartVertical;

  menuItems = [
    {
      name: 'General',
      items: [
        {
          icon: this.svgHome,
          name: 'Home',
          link: '/product'
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
        {
          icon: this.svgChartVertical,
          name: 'Chart',
          link: '/chart'
        }
      ]
    },
    {
      name: 'Account Pages',
      items: [
        {
          icon: this.svgUser,
          name: 'Profile',
          link: '/profile'
        },
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
