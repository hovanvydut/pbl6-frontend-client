import { Component, Input } from '@angular/core';
import { PostBaseModel } from '../../models/post.model';
// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
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
  selector: 'app-post-swiper-template',
  templateUrl: './post-swiper-template.component.html',
  styleUrls: ['./post-swiper-template.component.scss']
})
export class PostSwiperTemplateComponent {
  @Input() posts: PostBaseModel[] = [];
}
