import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
//
import { BaseService } from './base.service';
import {
  DistrictModel,
  AddressModel
} from './../../shared/models/address.model';
import { ItemModel } from '@app/shared/models/base.model';
import { WardModel } from '@app/shared/models/address.model';
import { PropertiesModel } from '@app/shared/models/property.model';
import { Router } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { moduleType, PermissionType } from '@app/shared/app.enum';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  properties: PropertiesModel[] = [];
  _properties: BehaviorSubject<PropertiesModel[]> = new BehaviorSubject<
    PropertiesModel[]
  >(this.properties);

  setProperties(value: PropertiesModel[]) {
    this._properties.next(value);
  }

  constructor(private baseService: BaseService, private router: Router) {}

  //#region Address
  getProvinces(): Observable<ItemModel[]> {
    return this.baseService.get<ItemModel[]>('address/province');
  }

  getDistricts(provinceId: string): Observable<DistrictModel> {
    return this.baseService.get<DistrictModel>(
      `address/district?provinceId=${provinceId}`
    );
  }

  getWards(districtId: string): Observable<WardModel> {
    return this.baseService.get<WardModel>(
      `address/ward?districtId=${districtId}`
    );
  }

  getAddressString(addressId: string): Observable<AddressModel> {
    return this.baseService.get<AddressModel>(
      `address/full-address?wardId=${addressId}`
    );
  }
  //#endregion

  //#region upload image
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.baseService.postFile<string>('filecontroler/upload', formData);
  }
  //#endregion

  //#region Property
  getRoomCategory(): Observable<ItemModel[]> {
    return this.baseService.get<ItemModel[]>('category/house-type');
  }

  getProperties(): Observable<PropertiesModel[]> {
    return this.baseService.get<PropertiesModel[]>('property');
  }
  //#endregion

  //#region Common
  checkDateIsInThePast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  validateAuthentication() {
    if (!this.baseService.isLoggedIn) {
      this.router
        .navigate([ENDPOINTS.LOGIN], {
          queryParams: { returnUrl: this.router.routerState.snapshot.url }
        })
        .then();
      return false;
    }
    return true;
  }
  //#endregion

  // check Permission
  checkPermission(permissions, type: moduleType) {
    let permission = [];
    switch (type) {
      case moduleType.Booking:
        permission = [
          PermissionType.BookingApproveMeeting,
          PermissionType.BookingConfirmMet,
          PermissionType.BookingCreateMeeting,
          PermissionType.BookingViewAllBooked,
          PermissionType.BookingViewAllPersonal,
          PermissionType.FreeTimeCreate,
          PermissionType.FreeTimeViewAll
        ];
        break;
      case moduleType.Notification:
        permission = [
          PermissionType.NotificationUpdate,
          PermissionType.NotificationViewAll
        ];
        break;
      case moduleType.Post:
        permission = [
          PermissionType.PostCheckDuplicateUptop,
          PermissionType.PostCreate,
          PermissionType.PostCreateUptop,
          PermissionType.PostDelete,
          PermissionType.PostGetUptop,
          PermissionType.PostUpdate,
          PermissionType.PostViewAllPersonal
        ];
        break;
      case moduleType.Statistic:
        permission = [
          PermissionType.PostStatisticViewDetailInDate,
          PermissionType.PostStatisticViewInDateRange,
          PermissionType.PostStatisticViewTopInDate
        ];
        break;
      case moduleType.Payment:
        permission = [PermissionType.VNPCreatePayment];
        break;
      case moduleType.PaymentHistory:
        permission = [
          PermissionType.PaymentViewAllHistory,
          PermissionType.PaymentViewAllHistoryPersonal,
          PermissionType.VNPViewAllHistory,
          PermissionType.VNPViewAllHistoryPersonal
        ];
        break;
      case moduleType.Review:
        permission = [
          PermissionType.ReviewCheckCanReview,
          PermissionType.ReviewCreate
        ];
        break;
      case moduleType.Uptop:
        permission = [
          PermissionType.BookingApproveMeeting,
          PermissionType.BookingConfirmMet,
          PermissionType.BookingCreateMeeting,
          PermissionType.BookingViewAllBooked,
          PermissionType.BookingViewAllPersonal
        ];
        break;
      case moduleType.AccountSetting:
        permission = [
          PermissionType.UserUpdateAccountAccess,
          PermissionType.UserUpdateProfile,
          PermissionType.UserViewAccountAccess,
          PermissionType.UserViewAll,
          PermissionType.UserViewPersonal
        ];
        break;
      case moduleType.Bookmark:
        permission = [
          PermissionType.BookmarkCreate,
          PermissionType.BookmarkRemove,
          PermissionType.BookmarkView
        ];
        break;
    }
    return permissions?.length > 0
      ? permissions.some(r => permission?.includes(r))
      : false;
  }
}
