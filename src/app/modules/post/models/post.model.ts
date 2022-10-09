export class Post {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  createdDate: Date;
  updatedDate: Date;
  rating: number;
  stock: number;
  reviews: Review[];

  public constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}

export class Category {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;

  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}

export class Review {
  id: number;
  name: string;
  rating: number;
  comment: string;

  public constructor(init?: Partial<Review>) {
    Object.assign(this, init);
  }
}
