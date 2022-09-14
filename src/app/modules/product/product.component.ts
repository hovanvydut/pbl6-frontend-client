import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { cloneDeep } from 'lodash-es';
import { ProductBannerComponent } from './components/product-banner/product-banner.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChildren('productList') productList: QueryList<ProductListComponent>;
  @ViewChild('productBanner', {static: true} ) productBanner: ProductBannerComponent;

  images = [
    {
      url: 'https://robohash.org/excepturiautemquod.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/etsaepealiquam.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/magnamuteveniet.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/cumprovidentqui.png?size=350x350&set=set1'
    },
    {
      url:
        'https://robohash.org/quaequaeratexercitationem.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/impediteumquo.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/totametipsa.png?size=350x350&set=set1'
    },
    {
      url:
        'https://robohash.org/autemtemporaconsectetur.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/voluptatesetnon.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/rationeetbeatae.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/accusamusquasvitae.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/dignissimoseiusqui.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/culpaeaofficia.png?size=350x350&set=set1'
    },
    {
      url:
        'https://robohash.org/rationepraesentiumperspiciatis.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/fugaeumdolorem.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/aperiammodiillum.png?size=350x350&set=set1'
    },
    {
      url:
        'https://robohash.org/doloresconsequunturaut.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/essesedea.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/fugadoloremdolore.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/sedearumnihil.png?size=350x350&set=set1'
    }
  ];

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
  selectedCategoryId = this.categories[0].id;
  products: [];

  constructor() {}

  ngOnInit() {}

  onCategoryClicked(id: string) {
    this.selectedCategoryId = id;
    this.productList.forEach((productListItem) => {
      productListItem.getProducts();
    })
  }
}
