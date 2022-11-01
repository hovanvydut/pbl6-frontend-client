import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  constructor() { }

  ngOnInit() {
  }

}
