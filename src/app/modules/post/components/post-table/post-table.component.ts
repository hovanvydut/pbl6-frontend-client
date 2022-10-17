import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {
  tableName: string = 'Tất cả bài đăng';
  displayedColumns: string[] = ['medias', 'title', 'area', 'price', 'category', 'address'];
  dataSource: MatTableDataSource<any>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }
}
