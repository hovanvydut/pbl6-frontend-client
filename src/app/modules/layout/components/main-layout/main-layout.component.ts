import { Component, OnInit } from '@angular/core';
import { svgNotification, svgMessage, svgArrowDown, svgCart } from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  svgNotification = svgNotification;
  svgMessage = svgMessage;
  svgArrowDown = svgArrowDown;
  svgCart = svgCart;

  constructor() { }

  ngOnInit() {
  }

}
