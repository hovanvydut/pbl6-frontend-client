import { Injectable } from '@angular/core';
import { BaseModel, DatasourceBaseModel } from '@app/shared/models/base.model';
import { of, Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { PostRequestModel, PostBaseModel, QueryParams } from './../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private baseService: BaseService) {}

  getPosts(params: QueryParams): Observable<DatasourceBaseModel<PostBaseModel>> {
    const queryString =
    '?' +
    Object.keys(params)
      .map(key => {
        if (params[key] !== null) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        }
        return '';
      })
      .join('&');
    return this.baseService.get(`post${queryString}`);
  }

  getPostById(id: string): Observable<PostBaseModel> {
    return this.baseService.get<PostBaseModel>(`post/${id}`);
  }

  deletePost(id: string) {
    return this.baseService.delete(`post/${id}`);
  }

  createNewPost(post: PostRequestModel): Observable<void> {
    return this.baseService.post(`post`, post);
  }

  updatePost(post: PostRequestModel): Observable<void> {
    return this.baseService.put(`post/${post.id}`, post);
  }
}
