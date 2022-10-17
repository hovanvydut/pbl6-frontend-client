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

  getProvince(): Observable<any> {
    return this.baseService.get<any>('address/province');
  }

  getDistrict(provinceId: any): Observable<any> {
    return this.baseService.get<any>(`district/provinceId=${provinceId}`);
  }

  getWard(districtId: any): Observable<any> {
    return this.baseService.get<any>(`ward/districtId=${districtId}`);
  }

  getAddressString(addressId: any): Observable<any> {
    return this.baseService.get<any>(`address-string/wardId=${addressId}`);
  }
  // #endregion

  //#region upload image
  uploadImage(file: File): Observable<string> {
    return this.baseService.post<string>('fileControler/upload', file, false);
  }
  // #endregion

  //#region
  getRoomCategory(): Observable<any[]> {
    return this.baseService.get<any[]>('category/house-type');
  }

  getPostProperty(): Observable<any>{
    return this.baseService.get<any>('property');
  }
  //#endregion
}
