import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostRequestModel } from '../../models/post.model';

@Component({
  selector: 'app-post-detail-form',
  templateUrl: './post-detail-form.component.html',
  styleUrls: ['./post-detail-form.component.scss']
})
export class PostDetailFormComponent implements OnInit {
  post: PostRequestModel = new PostRequestModel();
  previews: string[] = [];
  selectedFiles?: FileList;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

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
          type: 'textarea',
          width: 'full'
        },
        {
          name: 'description',
          label: 'Mô tả chung',
          placeholder: 'Nhập mô tả về trọ',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: 'full'
        },
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
          type: 'input',
          width: '1/3'
        },
        {
          name: 'district',
          label: 'Quận/Huyện',
          placeholder: 'Chọn quận/huyện',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
        {
          name: 'ward',
          label: 'Phường/Xã',
          placeholder: 'Chọn phường/xã',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
        {
          name: 'street',
          label: 'Đường',
          placeholder: 'Nhập địa chỉ số nhà, đường',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: 'full'
        },
      ]
    },
    {
      groupName: 'Thông tin chi tiết',
      items: [
        {
          name: 'roomType',
          label: 'Loại phòng',
          placeholder: 'Chọn loại phòng',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
        {
          name: 'price',
          label: 'Giá',
          placeholder: 'Nhập giá',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
        {
          name: 'area',
          label: 'Diện tích',
          placeholder: 'Nhập diện tích',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
      ]
    },
    {
      groupName: 'Thông tin thêm',
      items: [
        {
          name: 'totalAcceptedPeople',
          label: 'Số người tối đa',
          placeholder: 'Nhập số người tối đa',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
        {
          name: 'tenantType',
          label: 'Đối tượng cho thuê',
          placeholder: 'Chọn đối tượng cho thuê',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
        {
          name: 'deposit',
          label: 'Tiền cọc',
          placeholder: 'Nhập tiền cọc',
          require: true,
          value: new FormControl(''),
          type: 'input',
          width: '1/3'
        },
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
    console.log(data);

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
}
