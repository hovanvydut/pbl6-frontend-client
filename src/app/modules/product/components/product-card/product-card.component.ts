import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { Product } from 'src/app/modules/product/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  ENDPOINTS = ENDPOINTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
