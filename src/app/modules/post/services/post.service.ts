import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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

  posts = [
    {
      id: 1,
      name: 'Towels',
      category: this.categories[2],
      price: 10,
      image: 'https://robohash.org/excepturiipsamut.png?size=350x350&set=set1',
      description: 'Towels',
      rating: 4,
      stock: 10,
      reviews: [
        {
          id: 1,
          name: 'John',
          rating: 4,
          comment: 'Nice post'
        },
        {
          id: 2,
          name: 'Smith',
          rating: 5,
          comment: 'Good post'
        }
      ]
    },
    {
      id: 2,
      name: 'Shoes',
      category: this.categories[1],
      price: 20,
      image: 'https://robohash.org/autemquiquia.png?size=350x350&set=set1',
      description: 'Shoes',
      rating: 3,
      stock: 20,
      reviews: [
        {
          id: 1,

          name: 'John',
          rating: 4,
          comment: 'Nice post'
        },
        {
          id: 2,
          name: 'Smith',

          rating: 5,
          comment: 'Good post'
        }
      ]
    },
    {
      id: 3,
      name: 'Mobile',
      category: this.categories[0],
      price: 30,
      image: 'https://robohash.org/autemquiquia.png?size=350x350&set=set1',
      description: 'Mobile',
      rating: 5,
      stock: 30,
      reviews: [
        {
          id: 1,
          name: 'John',
          rating: 4,
          comment: 'Nice post'
        },
        {
          id: 2,
          name: 'Smith',
          rating: 5,
          comment: 'Good post'
        }
      ]
    },
    {
      id: 3,
      name: 'Mobile',
      category: this.categories[0],
      price: 30,
      image: 'https://robohash.org/autemquiquia.png?size=350x350&set=set1',
      description: 'Mobile',
      rating: 5,
      stock: 30,
      reviews: [
        {
          id: 1,
          name: 'John',
          rating: 4,
          comment: 'Nice post'
        },
        {
          id: 2,
          name: 'Smith',
          rating: 5,
          comment: 'Good post'
        }
      ]
    },
    {
      id: 3,
      name: 'Mobile',
      category: this.categories[0],
      price: 30,
      image: 'https://robohash.org/autemquiquia.png?size=350x350&set=set1',
      description: 'Mobile',
      rating: 5,
      stock: 30,
      reviews: [
        {
          id: 1,
          name: 'John',
          rating: 4,
          comment: 'Nice post'
        },
        {
          id: 2,
          name: 'Smith',
          rating: 5,
          comment: 'Good post'
        }
      ]
    },
    {
      id: 3,
      name: 'Mobile',
      category: this.categories[0],
      price: 30,
      image: 'https://robohash.org/autemquiquia.png?size=350x350&set=set1',
      description: 'Mobile',
      rating: 5,
      stock: 30,
      reviews: [
        {
          id: 1,
          name: 'John',
          rating: 4,
          comment: 'Nice post'
        },
        {
          id: 2,
          name: 'Smith',
          rating: 5,
          comment: 'Good post'
        }
      ]
    },
    {
      id: 3,
      name: 'Mobile',
      category: this.categories[0],
      price: 30,
      image: 'https://robohash.org/autemquiquia.png?size=350x350&set=set1',
      description: 'Mobile',
      rating: 5,
      stock: 30,
      reviews: [
        {
          id: 1,
          name: 'John',
          rating: 4,
          comment: 'Nice post'
        },
        {
          id: 2,
          name: 'Smith',
          rating: 5,
          comment: 'Good post'
        }
      ]
    }
  ];

  constructor(private baseService: BaseService) {}

  getPosts() {
    // list from posts with random size
    return of(this.posts.slice(0, Math.floor(Math.random() * 10)));
    // return this.baseService.get(`/posts`);
  }

  getImages() {
    return this.baseService.get(`/images`);
  }
}
