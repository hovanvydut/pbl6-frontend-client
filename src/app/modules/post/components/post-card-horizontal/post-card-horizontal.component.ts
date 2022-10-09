import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card-horizontal',
  templateUrl: './post-card-horizontal.component.html',
  styleUrls: ['./post-card-horizontal.component.scss']
})
export class PostCardHorizontalComponent implements OnInit {

  @Input() post: Post;

  ENDPOINTS = ENDPOINTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
