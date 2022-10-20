import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // categories with name of categories and id
  categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Fashion' },
    { id: '3', name: 'Home & Kitchen' },
    { id: '4', name: 'Books' },
    { id: '5', name: 'Sports' },
    { id: '6', name: 'Toys' },
    { id: '7', name: 'Grocery' },
    { id: '8', name: 'Beauty' },
    { id: '9', name: 'Health' },
    { id: '10', name: 'Automotive' }
  ];

  constructor(private baseService: BaseService) {}

  getPosts(): Observable<any> {
    return this.baseService.get(`post`);
  }

  getPostById(id: string): Observable<any>{
    return this.baseService.get(`post/${id}`);
  }

  deletePost(id: number) {
    return this.baseService.delete(`post/${id}`);
  }

  createNewPost(post: any) {
    return this.baseService.post(`post`, post);
  }

  updatePost(post: any) {
    return this.baseService.put(`post/${post.id}`, post);
  }

  getImages() {
    return this.baseService.get(`/images`);
  }
}
