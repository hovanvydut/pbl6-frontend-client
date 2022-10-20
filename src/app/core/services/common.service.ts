import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private baseService: BaseService) {}

  //#region Address

  getProvinces(): Observable<any> {
    return this.baseService.get<any>('address/province');
  }

  getDistricts(provinceId: any): Observable<any> {
    return this.baseService.get<any>(
      `address/district?provinceId=${provinceId}`
    );
  }

  getWards(districtId: any): Observable<any> {
    return this.baseService.get<any>(`address/ward?districtId=${districtId}`);
  }

  getAddressString(addressId: any): Observable<any> {
    return this.baseService.get<any>(
      `address/full-address?wardId=${addressId}`
    );
  }
  // #endregion

  //#region upload image
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.baseService.postFile<string>('filecontroler/upload', formData);
  }
  // #endregion

  //#region
  getRoomCategory(): Observable<any[]> {
    return this.baseService.get<any[]>('category/house-type');
  }

  getPostProperty(): Observable<any> {
    return this.baseService.get<any>('property');
  }
  //#endregion
}
