import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private baseService: BaseService) { }


  getHostFreeTime(hostId: string): Observable<any>{
    return this.baseService.get<any>(`booking/user/${hostId}/free-time`);
  }

  updateHostFreeTime(data: any): Observable<any>{
    return this.baseService.post<any>(`booking/free-time`, data);
  }

  getAllBooking() {
    return this.baseService.get<any>('booking');
  }

  createBooking(data:any) {
    return this.baseService.post<any>('booking', data);
  }

  approveAppointment(appointmentId: string) {
    return this.baseService.put<any>(`booking/${appointmentId}/approve`, null);
  }

  confirmAppointment(appointmentId: string) {
    return this.baseService.put<any>(`booking/${appointmentId}/confirm-meet`, null);
  }
}
