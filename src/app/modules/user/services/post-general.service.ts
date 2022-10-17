import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PostGeneralService {
  constructor(private baseService: BaseService) { }

  getPostProperty(): Observable<any>{
    return this.baseService.get<any>('Property');
  }

  getPostCategory(): Observable<any>{
    return this.baseService.get<any>('Category');
  }
}
