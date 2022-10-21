import { Component, OnInit, ViewChild } from '@angular/core';
//
import { SearchPanelComponent } from '@app/modules/layout/components/search-panel/search-panel.component';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-banner',
  templateUrl: './post-banner.component.html',
  styleUrls: ['./post-banner.component.scss']
})
export class PostBannerComponent implements OnInit {
  @ViewChild('searchPanel') searchPanel: SearchPanelComponent;
  images = [];

  filterParams = {
    searchKeyword: '',
  }

  selectedValue: string;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getImages();
  }

  getImages() {
    // random array from list images with random size larger than 3
    const randomSize = Math.floor(Math.random() * 10) + 3;
    const randomImages = this.images.sort(() => Math.random() - 0.5).slice(0, randomSize);

    this.images = randomImages;
  }

  updateFilterParams(searchKeyword: string) {
    this.filterParams.searchKeyword = searchKeyword;
    console.log(this.filterParams);

    this.getImages();
  }
}
