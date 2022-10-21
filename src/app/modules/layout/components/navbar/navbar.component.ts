import { Component, OnInit } from '@angular/core';
//
import { menuItems } from '../../const/menu.const';
import { BaseService } from '@app/core/services/base.service';
import { AccountModel } from '@app/modules/auth/models/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems = menuItems;
  accountInfo: AccountModel = new AccountModel();

  constructor(private baseService: BaseService) {
    this.accountInfo = this.baseService.currentUser;
  }

  ngOnInit() {}
}
