import { Injectable } from '@angular/core';
import { DatasourceBaseModel } from '@app/shared/models/base.model';
import { of, Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { PostBaseModel } from './../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private baseService: BaseService) {}

  getReviews(postId: string): Observable<any> {
    return this.baseService.get(`review/post/${postId}`);
  }

  postReview(postId: string, data: any): Observable<any> {
    return this.baseService.post(`review/post/${postId}`, data);
  }
}
