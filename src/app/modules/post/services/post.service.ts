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

  getPersonalPosts(params: QueryParams): Observable<DatasourceBaseModel<PostBaseModel>> {
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
    return this.baseService.get(`host/personal/post${queryString}`);
  }

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

  getSavedPosts(params: QueryParams): Observable<DatasourceBaseModel<PostBaseModel>> {
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
    return this.baseService.get(`bookmark${queryString}`);
  }

  getRelatedPosts(params: QueryParams): Observable<DatasourceBaseModel<PostBaseModel>> {
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
    return this.baseService.get(`post/related${queryString}`);
  }

  getPostsByLandlordId(id: string, params: QueryParams): Observable<DatasourceBaseModel<PostBaseModel>> {
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
    return this.baseService.get(`host/${id}/post${queryString}`);
  }

  getOutstandingPostsByHostId(id: string, params: QueryParams): Observable<DatasourceBaseModel<PostBaseModel>> {
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
    return this.baseService.get(`host/${id}/post${queryString}`);
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
  //  uptop post
  getUptopPosts(params: QueryParams): Observable<DatasourceBaseModel<PostBaseModel>> {
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
    return this.baseService.get(`uptop${queryString}`);
  }

  upTopPost(data: any): Observable<void> {
    return this.baseService.post(`uptop`, data);
  }

  detailUptopPost(id: string): Observable<any> {
    return this.baseService.get(`uptop/${id}`);
  }
}
