import { BOOKING_TAB_TYPE } from './../enums/booking.enum';
import { ItemModel } from "@app/shared/models/base.model";

export const BOOKING_TABS = [
    new ItemModel({
      name: 'Lịch hẹn xem trọ',
      id: BOOKING_TAB_TYPE.BOOKING
    }),
    new ItemModel({
      name: 'Lịch hẹn của tôi',
      id: BOOKING_TAB_TYPE.MY_BOOKING
    }),
  ];