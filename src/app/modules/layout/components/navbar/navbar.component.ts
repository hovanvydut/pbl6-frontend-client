import { Component, OnInit } from '@angular/core';
//
import { menuItems } from '../../const/menu.const';
import { BaseService } from '@app/core/services/base.service';
import { AccountModel } from '@app/modules/auth/models/auth.model';
import { ENDPOINTS } from '@app/shared/utilities';
import { CommonService } from '@app/core/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems = menuItems;
  accountInfo: AccountModel = new AccountModel();
  ENDPOINTS = ENDPOINTS;

  constructor(
    private baseService: BaseService,
    private commonService: CommonService
  ) {
    this.accountInfo = this.baseService.currentUser;
    const permissions = this.baseService.permission;
    this.menuItems.forEach(item => {
      if (item.type) {
        item.isVisible = this.commonService.checkPermission(
          permissions,
          item.type
        );
      }
    });
    this.menuItems = menuItems.filter(_ => _.isVisible);
  }

  ngOnInit() {}
}
