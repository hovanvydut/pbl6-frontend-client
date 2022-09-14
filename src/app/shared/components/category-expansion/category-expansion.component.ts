import { Component, OnInit } from '@angular/core';
import { svgBar } from 'src/assets/images/svg-icons.constants';

@Component({
  selector: 'app-category-expansion',
  templateUrl: './category-expansion.component.html',
  styleUrls: ['./category-expansion.component.scss']
})
export class CategoryExpansionComponent implements OnInit {
  svgBar = svgBar;

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

}
