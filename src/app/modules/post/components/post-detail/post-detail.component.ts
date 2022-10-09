import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  images = [
    {
      url: 'https://robohash.org/excepturiautemquod.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/etsaepealiquam.png?size=350x350&set=set1'
    },
    {
      url: 'https://robohash.org/etsaepealiquam.png?size=350x350&set=set1'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
