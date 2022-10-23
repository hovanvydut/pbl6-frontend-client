import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { PostBaseModel } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: PostBaseModel;

  ENDPOINTS = ENDPOINTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
