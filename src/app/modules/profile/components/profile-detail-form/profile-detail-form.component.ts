import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs';
//
import { BaseModel } from '@app/shared/models/base.model';
import { ProfileModel, ProfileUpdateModel } from '../../models/profile.model';
import { ProfileService } from '../../profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-detail-form',
  templateUrl: './profile-detail-form.component.html',
  styleUrls: ['./profile-detail-form.component.scss']
})
export class ProfileDetailFormComponent implements OnInit {
  formControl = [
    {
      items: [
        {
          name: 'avatar',
          label: 'Anh đại diện',
          placeholder: 'Tải lên ảnh đại diện',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'image',
          width: '1/3'
        },
        {
          name: 'displayName',
          label: 'Họ và tên',
          placeholder: 'Nhập họ và tên',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'input',
          width: 'full'
        },

        {
          name: 'phoneNumber',
          label: 'Số điện thoại',
          placeholder: 'Nhập số điện thoại',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'input',
          width: 'full'
        },
        {
          name: 'identityNumber',
          label: 'Căn cước công dân',
          placeholder: 'Nhập số căn cước công dân',
          require: true,
          value: new FormControl({ value: '', disabled: true }),
          inputType: 'text',
          fieldType: 'input',
          width: 'full',
          disable: true
        },
        {
          name: 'userAccountEmail',
          label: 'Địa chỉ email',
          placeholder: 'Nhập địa chỉ email',
          require: true,
          value: new FormControl({ value: '', disabled: true }),
          inputType: 'email',
          fieldType: 'input',
          width: 'full',
          disable: true
        }
      ]
    }
  ];

  constructor(
    private dialog: Dialog,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService
      .getProfileInfo()
      .subscribe((res: BaseModel<ProfileModel>) => {
        if (res.data) {
          this.formControl.forEach(group => {
            group.items.forEach(item => {
              item.value.setValue(res.data[item.name]);
            });
          });
        }
      });
  }

  onUpdateProfileInfo() {
    let data: any = {} as ProfileUpdateModel;
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        data[item.name] = item.value.value;
      });
    });
    this.profileService
      .updateProfileInfo(new ProfileUpdateModel({
        displayName: data.displayName,
        phoneNumber: data.phoneNumber,
        address: '123',
        addressWardId: '1',
      }))
      .pipe(finalize(() => {}))
      .subscribe(res => {
        if (res.success) {
          this.dialog.closeAll();
        } else {
          this.notify(res.message);
        }
      });
  }

  onUpdateAvatar(e: any) {
    let images = e.target.files;
    if (images && images.length > 1) {

    } else {
      let image = images[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e: any) => {
        this.formControl[0].items[0].value.setValue(e.target.result);
      };
    }
  }

  notify(message) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }
}
