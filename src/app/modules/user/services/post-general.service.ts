import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

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
