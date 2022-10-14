import { Component, OnInit } from '@angular/core';
import { menuItems } from '../../const/menu.const';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  menuItems = menuItems;
  constructor() { }

  ngOnInit() {
  }

}
