import { Injectable } from '@angular/core';
import { DatasourceBaseModel } from '@app/shared/models/base.model';
import { of, Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { PostBaseModel } from './../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  constructor(private baseService: BaseService) {}

  //#region  Bookmark
  getBookmarks(): Observable<DatasourceBaseModel<PostBaseModel>> {
    return this.baseService.get(`bookmark`);
  }

  addBookmark(postId: string): Observable<void> {
    return this.baseService.post(`bookmark/`, { postId: postId });
  }

  removeBookmark(postId: string): Observable<void> {
    return this.baseService.delete(`bookmark/${postId}`);
  }
}
