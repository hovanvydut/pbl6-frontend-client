import { ENDPOINTS } from './../../../../shared/utilities/endpoints';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  constructor() { }

  ngOnInit() {
  }

}
