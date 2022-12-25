import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//
import { ProfileGeneralInfoModel } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { ProfileDetailFormComponent } from './../profile-detail-form/profile-detail-form.component';
import { NotifyService } from '@app/shared/services/notify.service';
import { PaymentFormComponent } from '@app/modules/payment/payment-form/payment-form.component';
import { CheckPermissionPipe } from '@app/shared/pipes/check-permission.pipe';
import { PermissionType } from '@app/shared/app.enum';

@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrls: ['./general-profile.component.scss']
})
export class GeneralProfileComponent implements OnInit {
  private profileDetailFormComponent = ProfileDetailFormComponent;
  profileGeneralInfo: ProfileGeneralInfoModel = new ProfileGeneralInfoModel();
  hasPaymentPermission: boolean = false;

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private notifyService: NotifyService,
    private checkPermissionPipe: CheckPermissionPipe
  ) {
    this.hasPaymentPermission = this.checkPermissionPipe.transform(
      PermissionType.VNPCreatePayment
    );
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfileGeneralInfo().subscribe(
      (res: ProfileGeneralInfoModel) => {
        this.profileGeneralInfo = res;
      },
      err => {
        this.notifyService.notify(err);
      }
    );
  }

  onEditProfileButtonClicked() {
    const dialogRef = this.dialog.open(this.profileDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();
    });
  }

  onRechargeButtonClicked() {
    let dialogRef = this.dialog.open(PaymentFormComponent, {
      width: '99vw',
      maxHeight: '99vh'
    });
  }

  onUpgradeRole() {
    
  }
}
