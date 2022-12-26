import { Component, OnInit } from '@angular/core';
import { PermissionType } from '@app/shared/app.enum';
import { CheckPermissionPipe } from '@app/shared/pipes/check-permission.pipe';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  hasViewSavedPostPermission: boolean = false;

  constructor(private checkPermissionPipe: CheckPermissionPipe) {
    this.hasViewSavedPostPermission = this.checkPermissionPipe.transform(PermissionType.BookmarkView);
  }

  ngOnInit(): void {}
}
