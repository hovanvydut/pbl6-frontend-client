import { Component, OnInit } from '@angular/core';
import { svgNotification, svgMessage, svgArrowDown, svgCart } from 'src/assets/images/svg-icons.constants';

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

  constructor() { }

  ngOnInit() {
  }

}
