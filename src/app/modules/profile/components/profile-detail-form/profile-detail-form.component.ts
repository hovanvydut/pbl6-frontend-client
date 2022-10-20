import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs';
//
import { AppNotify } from '@app/shared/utilities';
import { BaseModel } from '@app/shared/models/base.model';
import { ProfileModel } from '../../models/profile.model';
import { ProfileService } from '../../profile.service';

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
          name: 'userAccountEmail',
          label: 'Địa chỉ email',
          placeholder: 'Nhập địa chỉ email',
          require: true,
          value: new FormControl(''),
          inputType: 'email',
          fieldType: 'input',
          width: 'full',
          disable: true,
        },
        {
          name: 'phoneNumber',
          label: 'Số điện thoại',
          placeholder: 'Nhập số điện thoại',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'input',
          width: '1/2'
        },
        {
          name: 'identityNumber',
          label: 'Căn cước công dân',
          placeholder: 'Nhập số căn cước công dân',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'input',
          width: '1/2',
          disable: true,
        },
      ]
    },
  ];


  constructor(private dialog: Dialog, private profileService: ProfileService) {}

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
    let data: any = {};
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        data[item.name] = item.value.value;
      });
    });
    console.log(data);
    this.profileService
      .updateProfileInfo(data)
      .pipe(finalize(() => {}))
      .subscribe(
        res => {
          if (res) {
            this.dialog.closeAll();
          }
        },
        err => {
          AppNotify.error('Có lỗi xảy ra, vui lòng thử lại!');
        }
      );
  }

  onUpdateAvatar(e: any) {
    let images = e.target.files;
    if (images && images.length > 1) {
      AppNotify.error('Chỉ được chọn 1 ảnh!');
    } else {
      let image = images[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e: any) => {
        this.formControl[0].items[0].value.setValue(e.target.result);
      };
    }
  }
}
