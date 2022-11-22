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
    return this.baseService.get<any>('booking/personal');
  }

  getMyBookings() {
    return this.baseService.get<any>('booking/booked-by-user');
  }

  createBooking(data:any) {
    return this.baseService.post<any>('booking', data);
  }

  approveBooking(bookingId: string) {
    return this.baseService.put<any>(`booking/${bookingId}/approve`, null);
  }

  confirmMeeting(bookingId: string) {
    return this.baseService.put<any>(`booking/${bookingId}/confirm-meet`, null);
  }
}
