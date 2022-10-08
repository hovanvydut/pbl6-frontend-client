import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/product/services/product.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  products: [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
    return this.products;
  }

}
