import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommonService } from '@app/core/services/common.service';
import { finalize } from 'rxjs';
import { PostRequestModel } from '../../models/post.model';
import { PostGeneralService } from './../../../user/services/post-general.service';

@Component({
  selector: 'app-post-detail-form',
  templateUrl: './post-detail-form.component.html',
  styleUrls: ['./post-detail-form.component.scss']
})
export class PostDetailFormComponent implements OnInit {
  post: PostRequestModel = new PostRequestModel();
  previews: string[] = [];
  selectedFiles?: FileList;

  // properties
  tenantTypes: any[] = [];
  roomTypes: any[] = [];
  districts: any[] = [];
  provinces: any[] = [];
  wards: any[] = [];
  constructor(private fb: FormBuilder, private commonService: CommonService,
    private postGeneralService: PostGeneralService) {}

  ngOnInit() {
    this.commonService.getProvince().pipe( finalize( () => {
    })).subscribe(val => {
      this.provinces = val;
      this.formControl[1].items[0].properties = this.provinces;
    });
  }

  formControl = [
    {
      groupName: 'Thông tin chung',
      items: [
        {
          name: 'title',
          label: 'Tiên đề bài đăng',
          placeholder: 'Tiên đề bài đăng',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'textarea',
          width: 'full'
        },
        {
          name: 'description',
          label: 'Mô tả chung',
          placeholder: 'Nhập mô tả về trọ',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'input',
          width: 'full'
        }
      ]
    },
    {
      groupName: 'Địa chỉ',
      items: [
        {
          name: 'city',
          label: 'Thành phố',
          placeholder: 'Chọn thành phố',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'select',
          width: '1/3',
          properties: this.provinces
        },
        {
          name: 'district',
          label: 'Quận/Huyện',
          placeholder: 'Chọn quận/huyện',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'select',
          width: '1/3',
          properties: this.districts
        },
        {
          name: 'addressWardId',
          label: 'Phường/Xã',
          placeholder: 'Chọn phường/xã',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'select',
          width: '1/3',
          properties: this.wards
        },
        {
          name: 'street',
          label: 'Đường',
          placeholder: 'Nhập địa chỉ số nhà, đường',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'input',
          width: 'full'
        }
      ]
    },
    {
      groupName: 'Thông tin chi tiết',
      items: [
        {
          name: 'categoryId',
          label: 'Loại phòng',
          placeholder: 'Chọn loại phòng',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'select',
          width: '1/3',
          properties: this.roomTypes
        },
        {
          name: 'price',
          label: 'Giá',
          placeholder: 'Nhập giá',
          require: true,
          value: new FormControl(''),
          inputType: 'number',
          fieldType: 'input',
          width: '1/3'
        },
        {
          name: 'area',
          label: 'Diện tích',
          placeholder: 'Nhập diện tích',
          require: true,
          value: new FormControl(''),
          inputType: 'number',
          fieldType: 'input',
          width: '1/3'
        }
      ]
    },
    {
      groupName: 'Thông tin thêm',
      items: [
        {
          name: 'limitTenant',
          label: 'Số người tối đa',
          placeholder: 'Nhập số người tối đa',
          require: true,
          value: new FormControl(''),
          inputType: 'number',
          fieldType: 'input',
          width: '1/3'
        },
        {
          name: 'tenantType',
          label: 'Đối tượng cho thuê',
          placeholder: 'Chọn đối tượng cho thuê',
          require: true,
          value: new FormControl(''),
          inputType: 'text',
          fieldType: 'select',
          width: '1/3',
          properties: this.tenantTypes
        },
        {
          name: 'prePaidPrice',
          label: 'Tiền cọc',
          placeholder: 'Nhập tiền cọc',
          require: true,
          value: new FormControl(''),
          inputType: 'number',
          fieldType: 'input',
          width: '1/3'
        }
      ]
    }
  ];

  validateUsername(value: any) {}

  onCreateNewPost() {
    let data: PostRequestModel = new PostRequestModel();
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        data[item.name] = item.value.value;
      });
    });
  }

  onFileSelected(e) {
    this.selectedFiles = e.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  onSelectedFieldChanged(item: { type: string; value: string }) {
    switch (item.type) {
      case 'city':
        this.formControl[1].items[0].value.setValue(item.value);
        break;
      case 'district':
        this.formControl[1].items[1].value.setValue(item.value);
        break;
      case 'ward':
        this.formControl[1].items[2].value.setValue(item.value);
        break;
      default:
        break;
    }
  }
}
