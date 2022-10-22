import { Component, OnInit } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { AccountModel } from '@app/modules/auth/models/auth.model';
import { ENDPOINTS } from '@app/shared/utilities';
import { menuItems } from '../../const/menu.const';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  menuItems = menuItems;
  accountInfo: AccountModel;
  ENDPOINTS = ENDPOINTS;

  constructor(private baseService: BaseService) {
    this.accountInfo = this.baseService.currentUser;
  }

  ngOnInit() {
  }

}
