import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//
import { ProfileGeneralInfoModel } from '../../models/profile.model';
import { BaseModel } from '@app/shared/models/base.model';
import { ProfileService } from './../../profile.service';
import { ProfileDetailFormComponent } from './../profile-detail-form/profile-detail-form.component';

@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrls: ['./general-profile.component.scss']
})
export class GeneralProfileComponent implements OnInit {
  dialogRef: any;
  private profileDetailFormComponent = ProfileDetailFormComponent;
  profileGeneralInfo: ProfileGeneralInfoModel = new ProfileGeneralInfoModel();

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService
      .getProfileGeneralInfo()
      .subscribe((res: BaseModel<ProfileGeneralInfoModel>) => {
        this.profileGeneralInfo = res.data;
      });
  }

  onEditProfileButtonClicked() {
    this.dialogRef = this.dialog.open(this.profileDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
  }
}
