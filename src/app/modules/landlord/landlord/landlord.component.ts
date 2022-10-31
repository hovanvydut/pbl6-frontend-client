import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/core/services/common.service';
import {
  PostBaseModel,
  QueryParams
} from '@app/modules/post/models/post.model';
import { PostService } from '@app/modules/post/services/post.service';
import { ItemModel } from '@app/shared/models/base.model';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss'],
})
export class LandlordComponent implements OnInit {
  posts: PostBaseModel[] = [];
  outstandingPosts: PostBaseModel[] = [];

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
  landloardId: string;
  totalPosts: number = 0;

  constructor(
    private commonService: CommonService,
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.landloardId = this.route.snapshot.paramMap.get('landlordId');
    this.getRoomCategory();
    this.getPosts();
    this.getOutstandingPosts();
  }

  getRoomCategory() {
    this.commonService.getRoomCategory().subscribe(val => {
      this.roomTypes = [...this.roomTypes, ...val];
    });
  }

  getPosts() {
    this.postService.getPostsByLandlordId(this.landloardId, this.queryParams).subscribe(res => {
      this.posts = res.records;
      this.totalPosts = res.totalRecords;
    });
  }

  getOutstandingPosts() {
    this.postService.getOutstandingPostsByHostId(this.landloardId, this.queryParams).subscribe(res => {
      this.outstandingPosts = res.records;
    });
  }

  onTabClick(link: any) {
    this.selectedCategory = link;
    this.queryParams.categoryId = link.id as string;
    this.getPosts();
  }

}
