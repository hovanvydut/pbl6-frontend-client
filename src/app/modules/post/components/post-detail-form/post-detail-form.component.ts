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
import { PostService } from '@app/modules/post/services/post.service';
import { PropertyEnum } from '../../enums/property.enum';

@Component({
  selector: 'app-post-detail-form',
  templateUrl: './post-detail-form.component.html',
  styleUrls: ['./post-detail-form.component.scss']
})
export class PostDetailFormComponent implements OnInit {
  post: PostRequestModel = new PostRequestModel();
  previews: string[] = [];
  selectedFiles?: FileList;
  PropertyEnum = PropertyEnum;

  // properties
  tenantTypes: any[] = [];
  nearbyPlaces: any[] = [];
  otherProperties: any[] = [];

  roomTypes: any[] = [];

  districts: any[] = [];
  provinces: any[] = [];
  wards: any[] = [];
  streets: any[] = [];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private postService: PostService
  ) {}

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

    this.commonService.getPostProperty().subscribe(res => {
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
  }

  // group 0: thông tin chung
  // group 1: địa chỉ
  // group 2: thông tin chi tiết
  // group 3: thông tin thêm
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
          label: 'Tỉnh/Thành phố',
          placeholder: 'Chọn thành phố',
          require: true,
          value: new FormControl('1'),
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
          width: '1/2'
        },
        {
          name: 'prePaidPrice',
          label: 'Tiền cọc',
          placeholder: 'Nhập tiền cọc',
          require: true,
          value: new FormControl(''),
          inputType: 'number',
          fieldType: 'input',
          width: '1/2'
        },
        {
          id: PropertyEnum.OtherProperties,
          name: 'otherProperties',
          label: 'Tiện ích khác',
          placeholder: 'Chọn tiện ích khác',
          require: true,
          value: new FormControl([]),
          inputType: 'text',
          fieldType: 'property',
          width: 'full',
          properties: this.otherProperties
        },
        {
          id: PropertyEnum.TenantTypes,
          name: 'tenantType',
          label: 'Đối tượng cho thuê',
          placeholder: 'Chọn đối tượng cho thuê',
          require: true,
          value: new FormControl([]),
          inputType: 'text',
          fieldType: 'property',
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
          inputType: 'text',
          fieldType: 'property',
          width: 'full',
          properties: this.nearbyPlaces
        }
      ]
    }
  ];
  validateUsername(value: any) {}

  onCreateNewPost() {
    let data: PostRequestModel = new PostRequestModel();
    this.formControl.forEach(group => {
      group.items.forEach(item => {
        if (item.fieldType === 'property') {
          data.properties = [...data.properties,
            ...item.value.value.map(el => {
              return el.id;
            })
          ];
        } else {
          data[item.name] = item.value.value;
        }
      });
    });
    data.medias = this.previews.map(el => {
      return {
        url: el,
      };
    });
    console.log(data);
    this.postService.createNewPost(data).subscribe(res => {
      console.log(res);
    });
  }

  onFileSelected(e) {
    this.selectedFiles = e.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.commonService.uploadImage(this.selectedFiles[i]).subscribe(res => {
          this.previews.push(res);
        });
      }
    }
  }

  onSelectedFieldChanged(item: { type: string; value: any }) {
    console.log(item);
    switch (item.type) {
      case 'city':
        this.formControl[1].items[0].value.setValue(item.value);
        this.handleCitySelected(item.value);
        break;
      case 'district':
        this.formControl[1].items[1].value.setValue(item.value);
        this.handleDistrictSelected(item.value);
        break;
      case 'ward':
        this.formControl[1].items[2].value.setValue(item.value);
        break;
      case 'categoryId':
        this.formControl[2].items[0].value.setValue(item.value);
        break;
      case 'otherProperties':
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
      console.log(res);
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
