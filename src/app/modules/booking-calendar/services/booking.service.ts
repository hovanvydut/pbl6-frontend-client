import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { DatasourceBaseModel } from '@app/shared/models/base.model';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private baseService: BaseService) {}

  getHostFreeTime(hostId: string): Observable<CalendarEvent<any>[]> {
    return this.baseService.get<CalendarEvent<any>[]>(
      `booking/user/${hostId}/free-time`
    );
  }

  updateHostFreeTime(data: { data: any }): Observable<void> {
    return this.baseService.post<void>(`booking/free-time`, data);
  }

  getAllBooking(): Observable<DatasourceBaseModel<any>> {
    return this.baseService.get<DatasourceBaseModel<any>>('booking/personal');
  }

  getMyBookings(): Observable<DatasourceBaseModel<any>>{
    return this.baseService.get<DatasourceBaseModel<any>>('booking/booked-by-user');
  }

  getDetailBooking(bookingId: string) {
    return this.baseService.get<any>(`booking/booked-by-user/${bookingId}`);
  }

  createBooking(data: any) {
    return this.baseService.post<void>('booking', data);
  }

  approveBooking(bookingId: string) {
    return this.baseService.put<void>(`booking/${bookingId}/approve`, null);
  }

  confirmMeeting(bookingId: string) {
    return this.baseService.put<void>(`booking/${bookingId}/confirm-meet`, null);
  }
}
