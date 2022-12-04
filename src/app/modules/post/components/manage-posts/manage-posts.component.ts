import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
//
import { PostDetailFormComponent } from '../post-detail-form/post-detail-form.component';
import { PostTableComponent } from '@app/modules/post/components/post-table/post-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '@app/shared/components/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '@app/shared/services/notify.service';
import { QueryParams, PostBaseModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { PostUptopComponent } from '../post-uptop/post-uptop.component';
import { PostDetailUptopComponent } from '../post-detail-uptop/post-detail-uptop.component';
import { ItemModel } from '@app/shared/models/base.model';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss']
})
export class ManagePostsComponent implements OnInit {
  @ViewChild('matPaginator') paginator: MatPaginator;
  postDetailFormComponent = PostDetailFormComponent;
  forceUpdate: boolean = false;
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
  totalPosts: number = 0;

  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10
  });
  tabs = [
    new ItemModel({
      name: 'Tất cả bài đăng',
      id: 'all'
    }),
    new ItemModel({
      name: 'Bài đăng uptop',
      id: 'uptop'
    }),
    // new ItemModel({
    //   name: 'Bài đăng đã xoá',
    //   id: 'deleted'
    // })
  ];
  selectedTab = this.tabs[0];

  dataSource: MatTableDataSource<PostBaseModel> = new MatTableDataSource();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hasUpdate: boolean },
    public dialog: MatDialog,
    private postService: PostService,
    private notifyService: NotifyService
  ) {}

  onAddNewPostButtonClicked() {
    let dialogRef = this.dialog.open(this.postDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
    });
  }

  handleEditPost(postId: any) {
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

  ngOnInit(): void {
    this.getPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPosts() {
    this.postService.getPersonalPosts(this.queryParams).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<PostBaseModel>(data.records);
        this.totalPosts = data.totalRecords;
      },
      e => {
        this.notifyService.notify(e);
      }
    );
  }

  pageChangeEvent(event: { pageIndex: number; pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.pageNumber = event.pageIndex + 1;;
    this.getPosts();
  }

  onDeletePostButtonClicked(postId: string) {
    if (postId) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {
          message: 'Xác nhận xoá'
        }
      });
      dialogRef.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.postService.deletePost(postId).subscribe(
            data => {
              this.getPosts();
            },
            e => {
              this.notifyService.notify(e);
            }
          );
        }
      });
    }
  }

  onEditPostButtonClicked(postId: string) {
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

  onUptopPostButtonClicked(postId: string) {
    if (postId) {
      let dialogRef = this.dialog.open(PostUptopComponent, {
        maxHeight: '99vh',
        data: {
          post: this.dataSource.data.find(x => x.id == postId)
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getPosts();
      });
    }
  }

  onViewTopTimeButtonClicked(postId: string) {
    if (postId) {
      let dialogRef = this.dialog.open(PostDetailUptopComponent, {
        maxHeight: '99vh',
        data: {
          postId: postId
        }
      });
    }
  }

  onTabClick(link: any) {
    this.selectedTab = link;
    // this.queryParams.categoryId = link.id as string;
    switch( this.selectedTab.id ) {
      case 'all':
        delete this.queryParams.priority;
        delete this.queryParams.includeDeletedPost;
        break;
      case 'uptop':
        this.queryParams.priority = true;
        delete this.queryParams.includeDeletedPost;
        break;
      case 'deleted':
        this.queryParams.includeDeletedPost = true;
        delete this.queryParams.priority;
        break;
      default:
        break;
    }
    this.getPosts();
  }
}
