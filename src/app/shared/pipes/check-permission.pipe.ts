import { PermissionType } from '@app/shared/app.enum';
import { Pipe, PipeTransform } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';

@Pipe({
  name: 'checkPermission'
})
export class CheckPermissionPipe implements PipeTransform {
  constructor(private baseService: BaseService) {}

  transform(value: PermissionType | string, args?: any): any {
    return this.baseService.permission?.includes(value);
  }
}