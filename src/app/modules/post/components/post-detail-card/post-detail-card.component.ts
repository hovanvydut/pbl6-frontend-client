import { Component, Input, OnInit } from '@angular/core';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { PostBaseModel } from '../../models/post.model';

@Component({
  selector: 'app-post-detail-card',
  templateUrl: './post-detail-card.component.html',
  styleUrls: ['./post-detail-card.component.css']
})
export class PostDetailCardComponent implements OnInit {
  @Input() post: PostBaseModel;
  completeIconSet = completeIconSet;
  constructor() { }

  ngOnInit() {
  }

}
