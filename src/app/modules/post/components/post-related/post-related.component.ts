import { Component, OnInit } from '@angular/core';
import { PostBaseModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';
// swiper
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required components
import SwiperCore , {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-post-related',
  templateUrl: './post-related.component.html',
  styleUrls: ['./post-related.component.scss']
})
export class PostRelatedComponent implements OnInit {
  posts: PostBaseModel[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((res) => {
      this.posts = res.records;
    });
  }
}
