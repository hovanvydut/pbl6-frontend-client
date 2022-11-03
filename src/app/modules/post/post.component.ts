import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';
import { cloneDeep } from 'lodash-es';
import { PostBannerComponent } from './components/post-banner/post-banner.component';
import { CommonService } from '@app/core/services/common.service';
import { PostService } from '@app/modules/post/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @ViewChildren('postList') postList: QueryList<PostListComponent>;
  @ViewChild('postBanner', {static: true} ) postBanner: PostBannerComponent;

  images = [];
  imageUrl = 'assets/images/district/';

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.getDistricts('32').subscribe((res) => {
      this.images = res.addressDistricts.map((item) => {


        return {
          id: item.id,
          name: item.name,
          image: this.imageUrl + Math.floor(( Math.random() * (10 - 1) + 1 )) + '.jpg',
          };
      });
    });  }

}
