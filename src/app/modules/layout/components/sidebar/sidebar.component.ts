import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '@app/shared/utilities';
import { menuItems } from '../../const/menu.const';
//
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  SIDEBAR_MENU = [
    {
      name: 'Dashboard',
      items: menuItems
    },
  ];

  constructor() {}

  ngOnInit() {}
}
