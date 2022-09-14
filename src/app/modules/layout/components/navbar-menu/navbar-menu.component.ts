import { Component, OnInit } from '@angular/core';
//
import { svgNotification, svgMessage, svgArrowDown, svgCart } from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {
  svgNotification = svgNotification;
  svgMessage = svgMessage;
  svgArrowDown = svgArrowDown;
  svgCart = svgCart;

  constructor() { }

  ngOnInit() {
  }

}
