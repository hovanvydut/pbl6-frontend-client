import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDetailFormComponent } from './../profile-detail-form/profile-detail-form.component';
import { ProfileService } from './../../profile.service';

@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrls: ['./general-profile.component.scss']
})
export class GeneralProfileComponent implements OnInit {
  private profileDetailFormComponent = ProfileDetailFormComponent;
  dialogRef: any;
  profileGeneralInfo: any = {};

  constructor(public dialog: MatDialog,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfileGeneralInfo().subscribe((res: any) => {
      this.profileGeneralInfo = res;
    });
  }

  onEditProfileButtonClicked() {
    this.dialogRef = this.dialog.open(this.profileDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
    console.log('Add button clicked');
  }
}
