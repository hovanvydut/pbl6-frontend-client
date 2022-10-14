import { Component, OnInit } from '@angular/core';
import { svgNotification, svgMessage, svgArrowDown, svgCart } from 'src/assets/images/svg-icons.constants';
import { ENDPOINTS } from '@app/shared/utilities';
import { menuItems } from '../../const/menu.const';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  svgNotification = svgNotification;
  svgMessage = svgMessage;
  svgArrowDown = svgArrowDown;
  svgCart = svgCart;

  menuItems = menuItems;

  constructor() { }

  ngOnInit() {
  }

}
