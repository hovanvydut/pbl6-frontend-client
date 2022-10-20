import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from './../../services/post.service';
import { ConfirmDialogComponent } from './../../../../shared/components/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailFormComponent } from './../post-detail-form/post-detail-form.component';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {
  tableName: string = 'Tất cả bài đăng';
  displayedColumns: string[] = [
    'medias',
    'title',
    'area',
    'price',
    'category',
    'address',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  private _forceUpdate: boolean = false;
  @Input() set forceUpdate(value: boolean) {
    if (value) {
      this.getPosts();
    }
    this._forceUpdate = false;
  }

  @Output() onEditPost = new EventEmitter<string>();
  private postDetailFormComponent = PostDetailFormComponent;

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
    if (id) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {
          message: 'Xác nhận xoá'
        }
      });
      dialogRef.afterClosed().subscribe(confirm => {
        if (confirm) {
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

  editPost(postId: any) {
    if (postId) {
      let dialogRef = this.dialog.open(this.postDetailFormComponent, {
        width: '70vw',
        maxHeight: '90vh',
        data: { postId: postId }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPosts();
      });
    }
  }
}
