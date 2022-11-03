import { Component, OnInit } from '@angular/core';
//
import { menuItems } from '../../const/menu.const';
import { BaseService } from '@app/core/services/base.service';
import { AccountModel } from '@app/modules/auth/models/auth.model';
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems = menuItems;
  accountInfo: AccountModel = new AccountModel();
  ENDPOINTS = ENDPOINTS;

  constructor(private baseService: BaseService) {
    this.accountInfo = this.baseService.currentUser;
  }

  ngOnInit() {}
}
