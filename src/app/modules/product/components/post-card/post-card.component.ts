import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { Product } from 'src/app/modules/product/models/product.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() product: Product;

  ENDPOINTS = ENDPOINTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
