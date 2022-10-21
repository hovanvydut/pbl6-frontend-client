import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: any;

  ENDPOINTS = ENDPOINTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
