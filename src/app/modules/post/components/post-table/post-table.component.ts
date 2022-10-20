import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from './../../services/post.service';
import { ConfirmDialogComponent } from './../../../../shared/components/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {
  tableName: string = 'Tất cả bài đăng';
  displayedColumns: string[] = ['medias', 'title', 'area', 'price', 'category', 'address', 'action'];
  dataSource: MatTableDataSource<any>;
  @Output() onEditPost = new EventEmitter<string>();

  constructor(private dialog: MatDialog, private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }

  deletePost(id: number) {
    if( id )  {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data:{
          message: 'Xác nhận xoá',
        }
      });
      dialogRef.afterClosed().subscribe(confirm => {
        if(confirm) {
          this.postService.deletePost(id).subscribe(data => {
            this.getPosts();
          });
          this.postService.deletePost(id).subscribe(data => {
            this.getPosts();
          });
        }
      });
    }
  }

  editPost(id: string) {
    this.onEditPost.emit(id);
  }
}
