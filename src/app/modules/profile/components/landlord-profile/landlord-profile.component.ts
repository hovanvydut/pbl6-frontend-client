import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostBookingComponent } from '@app/modules/post/components/post-booking/post-booking.component';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import {
  ProfileBaseModel,
  ProfileGeneralInfoModel,
  ProfileModel
} from '../../models/profile.model';
import { NotifyService } from '@app/shared/services/notify.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.scss']
})
export class LandlordProfileComponent implements OnInit {
  @Input() landlordId: number;
  @Input() landLordProfile: ProfileModel = new ProfileModel();
  @Input() authorInfo: ProfileBaseModel = new ProfileBaseModel();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private profileService: ProfileService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    if (this.landlordId) {
      this.getProfile();
    } else {
      this.landLordProfile = new ProfileModel();
    }
  }

  getProfile() {
    this.profileService.getProfileInfoById(this.landlordId).subscribe(
      (res: ProfileModel) => {
        this.landLordProfile = res;
      },
      err => {
        this.notifyService.notify(err);
      }
    );
  }

  onBookingCalendarButtonClicked() {
    let dialogRef = this.dialog.open(PostBookingComponent, {
      width: '99vw',
      maxHeight: '99vh',
      data: {
        postId: 1
      }
    });
  }

  onViewAuthorProfileButtonClicked() {
    const id = this.authorInfo.id || this.landlordId;
    this.router.navigateByUrl(ENDPOINTS.LANDLORD + '/' + id );
  }
}
