import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SearchPanelComponent } from '@app/modules/layout/components/search-panel/search-panel.component';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss']
})
export class ProductBannerComponent implements OnInit {
  @ViewChild('searchPanel') searchPanel: SearchPanelComponent;
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

  filterParams = {
    searchKeyword: '',
  }

  selectedValue: string;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getImages();
  }

  getImages() {
    // random array from list images with random size larger than 3
    const randomSize = Math.floor(Math.random() * 10) + 3;
    const randomImages = this.images.sort(() => Math.random() - 0.5).slice(0, randomSize);

    this.images = randomImages;
  }

  updateFilterParams(searchKeyword: string) {
    this.filterParams.searchKeyword = searchKeyword;
    console.log(this.filterParams);

    this.getImages();
  }
}
