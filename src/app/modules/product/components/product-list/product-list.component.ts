import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/product/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
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
