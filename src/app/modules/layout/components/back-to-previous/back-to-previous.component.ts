import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-previous',
  templateUrl: './back-to-previous.component.html',
  styleUrls: ['./back-to-previous.component.scss']
})
export class BackToPreviousComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backToPrevious() {
    this.location.back()
  }
}
