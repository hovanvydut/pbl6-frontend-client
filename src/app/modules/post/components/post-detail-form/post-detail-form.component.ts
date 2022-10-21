import { Component, Inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
//
import { PropertyEnum } from '../../enums/property.enum';
import { FieldType, PostGroupName } from '../../enums/post.enum';
import { PostRequestModel } from '../../models/post.model';
import { CommonService } from '@app/core/services/common.service';
import { PostService } from '@app/modules/post/services/post.service';
import { ItemModel } from './../../../../shared/models/base.model';
import { FormControlBaseModel } from '@app/shared/models/form.model';
import { InputType } from '@app/shared/app.enum';

@Component({
  selector: 'app-post-detail-form',
  templateUrl: './post-detail-form.component.html',
  styleUrls: ['./post-detail-form.component.scss']
})
export class PostDetailFormComponent implements OnInit {
  post: PostRequestModel = new PostRequestModel();
  postDetail: PostRequestModel = new PostRequestModel();
  previews: string[] = [];
  selectedFiles?: FileList;
  PropertyEnum = PropertyEnum;

  // properties
  tenantTypes: ItemModel[] = [];
  nearbyPlaces: ItemModel[] = [];
  roomTypes: ItemModel[] = [];
  properties: any[] = [];

  provinces: ItemModel[] = [];
  districts: ItemModel[] = [];
  wards: ItemModel[] = [];
  streets: ItemModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { postId: string },
    private dialog: Dialog,
    private commonService: CommonService,
    private postService: PostService
  ) {}

  // group 0: thông tin chung
  // group 1: địa chỉ
  // group 2: thông tin chi tiết
  // group 3: thông tin thêm
  formControl: FormControlBaseModel[] = [
    {
      groupName: PostGroupName.GeneralInfo,
      items: [
        {
          name: 'title',
          label: 'Tiên đề bài đăng',
          placeholder: 'Tiên đề bài đăng',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Textarea,
          width: 'full',
        },
        {
          name: 'description',
          label: 'Mô tả chung',
          placeholder: 'Nhập mô tả về trọ',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full',
        }
      ]
    },
    {
      groupName: PostGroupName.Address,
      items: [
        {
          name: 'province',
          label: 'Tỉnh/Thành phố',
          placeholder: 'Chọn thành phố',
          require: true,
          value: new FormControl('1'),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.provinces
        },
        {
          name: 'district',
          label: 'Quận/Huyện',
          placeholder: 'Chọn quận/huyện',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.districts
        },
        {
          name: 'addressWardId',
          label: 'Phường/Xã',
          placeholder: 'Chọn phường/xã',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.wards
        },
        {
          name: 'street',
          label: 'Đường',
          placeholder: 'Nhập địa chỉ số nhà, đường',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Input,
          width: 'full',
        }
      ]
    },
    {
      groupName: PostGroupName.DetailInfo,
      items: [
        {
          name: 'categoryId',
          label: 'Loại phòng',
          placeholder: 'Chọn loại phòng',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Text,
          fieldType: FieldType.Select,
          width: '1/3',
          properties: this.roomTypes
        },
        {
          name: 'price',
          label: 'Giá',
          placeholder: 'Nhập giá',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3',
        },
        {
          name: 'area',
          label: 'Diện tích',
          placeholder: 'Nhập diện tích',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3',
        }
      ]
    },
    {
      groupName: PostGroupName.AdditionalInfo,
      items: [
        {
          name: 'limitTenant',
          label: 'Số người tối đa',
          placeholder: 'Nhập số người tối đa',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3',
        },
        {
          name: 'prePaidPrice',
          label: 'Tiền cọc',
          placeholder: 'Nhập tiền cọc',
          require: true,
          value: new FormControl(''),
          inputType: InputType.Number,
          fieldType: FieldType.Input,
          width: '1/3',
        },
        {
          id: PropertyEnum.OtherProperties,
          name: 'properties',
          label: 'Tiện ích khác',
          placeholder: 'Chọn tiện ích khác',
          require: true,
          value: new FormControl([]),
          inputType: InputType.Text,
          fieldType: FieldType.Property,
          width: 'full',
          properties: this.properties
        },
        {
          id: PropertyEnum.TenantTypes,
          name: 'tenantType',
          label: 'Đối tượng cho thuê',
          placeholder: 'Chọn đối tượng cho thuê',
          require: true,
          value: new FormControl([]),
          inputType: InputType.Text,
          fieldType: FieldType.Property,
          width: 'full',
          properties: this.tenantTypes
        },
        {
          id: PropertyEnum.NearbyPlaces,
          name: 'nearbyPlaces',
          label: 'Địa điểm gần đó',
          placeholder: 'Chọn địa điểm gần đó',
          require: true,
          value: new FormControl([]),
          inputType: InputType.Text,
          fieldType: FieldType.Property,
          width: 'full',
          properties: this.nearbyPlaces
        }
      ]
    }
  ];

  ngOnInit() {
    this.commonService
      .getProvinces()
      .pipe(finalize(() => {}))
      .subscribe(val => {
        this.provinces = val;
        this.formControl[1].items[0].properties = this.provinces;
      });

    this.commonService.getRoomCategory().subscribe(val => {
      this.roomTypes = val;
      this.formControl[2].items[0].properties = this.roomTypes;
    });

    this.commonService.getProperties().subscribe(res => {
      res.forEach(property => {
        switch (property.id) {
          case PropertyEnum.OtherProperties:
            this.formControl[3].items[2].properties = property.properties;
            break;
          case PropertyEnum.TenantTypes:
            this.formControl[3].items[3].properties = property.properties;
            break;
          case PropertyEnum.NearbyPlaces:
            this.formControl[3].items[4].properties = property.properties;
            break;
        }
      });
    });

    if (this.data?.postId) {
      this.postService.getPostById(this.data.postId).subscribe(res => {
        this.postDetail = res;
        this.convertPostToFormControl();
        console.log(res);
        this.previews = res.medias.map(el => el.url);
      });
    }
  }

  onCreateNewPost() {
    let data: PostRequestModel = new PostRequestModel();
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        if (item.fieldType === FieldType.Property) {
          if (item.value.value && item.value.value.length > 0) {
            data.properties = [
              ...data.properties,
              ...item.value.value.map(el => {
                return el.id;
              })
            ];
          }
        } else {
          data[item.name] = item.value.value;
        }
      });
    });
    data.medias = this.previews.map(el => {
      return {
        url: el
      };
    });
    if (this.data?.postId) {
      data.id = this.data.postId;
      this.postService
        .updatePost(
          new PostRequestModel({
            ...data
          })
        )
        .subscribe(res => {
          this.dialog.closeAll();
        });
    } else {
      this.postService
        .createNewPost(
          new PostRequestModel({
            ...data
          })
        )
        .subscribe(res => {
          this.dialog.closeAll();
        });
    }
  }

  convertPostToFormControl() {
    this.previews = [...this.post.medias];
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        // handle address
        if (item.name === 'province' || item.name === 'district') {
          item.value.setValue(this.postDetail.address[item.name].id);
        } else {
          if (item.name === 'addressWardId') {
            item.value.setValue(this.postDetail.address['ward'].id);
          } else {
            if (item.name !== 'properties') {
              item.value.setValue(this.postDetail[item.name]);
              if (item.name === 'categoryId') {
                item.value.setValue(this.postDetail.category.id);
              }
            }
          }
        }
        // handle properties
        // TODO:
      });
    });
  }
  handleMapAddress() {}

  onFileSelected(url) {
    this.previews.push(url);
  }

  onSelectedFieldChanged(item: { type: string; value: any }) {
    switch (item.type) {
      case 'province':
        this.formControl[1].items[0].value.setValue(item.value);
        this.handleCitySelected(item.value);
        break;
      case 'district':
        this.formControl[1].items[1].value.setValue(item.value);
        this.handleDistrictSelected(item.value);
        break;
      case 'addressWardId':
        this.formControl[1].items[2].value.setValue(item.value);
        break;
      case 'categoryId':
        this.formControl[2].items[0].value.setValue(item.value);
        break;
      case 'properties':
        this.formControl[3].items[2].value.setValue(item.value);
        break;
      case 'tenantType':
        this.formControl[3].items[3].value.setValue(item.value);
        break;
      case 'nearbyPlaces':
        this.formControl[3].items[4].value.setValue(item.value);
        break;
      default:
        break;
    }
  }

  handleCitySelected(cityId: string) {
    this.commonService.getDistricts(cityId).subscribe(res => {
      this.districts = res.addressDistricts;
      this.formControl[1].items[1].properties = res.addressDistricts;
    });
  }

  handleDistrictSelected(districtId: string) {
    this.commonService.getWards(districtId).subscribe(res => {
      this.wards = res.addressWards;
      this.formControl[1].items[2].properties = res.addressWards;
    });
  }
}
