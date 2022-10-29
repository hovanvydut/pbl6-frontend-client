import { NINE } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services/common.service';
import {
  PostBaseModel,
  QueryParams
} from '@app/modules/post/models/post.model';
import { PostService } from '@app/modules/post/services/post.service';
import { ItemModel } from '@app/shared/models/base.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  posts: PostBaseModel[] = [];
  roomTypes: ItemModel[] = [
    new ItemModel({
      id: null,
      name: 'Tất cả'
    })
  ];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10,
    categoryId: null,
  });
  selectedCategory = this.roomTypes[0];
  totalPosts: number = 0;


  constructor(
    private commonService: CommonService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getRoomCategory();
    this.getPosts();
  }

  getRoomCategory() {
    this.commonService.getRoomCategory().subscribe(val => {
      this.roomTypes = [...this.roomTypes, ...val];
    });
  }

  getPosts() {
    this.postService.getPosts(this.queryParams).subscribe(res => {
      this.posts = res.records;
      this.totalPosts = res.totalRecords;
    });
  }

  onTabClick(link: any) {
    this.selectedCategory = link;
    this.queryParams.categoryId = link.id as string;
    this.getPosts();
  }

}
