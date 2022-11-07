import { trigger, style, animate, transition } from '@angular/animations';
import { EventColor } from 'calendar-utils';

export const ALLOWED_PAGE_SIZES = [25, 50, 100];

export const USER_ROLES = {
  Admin: 'Admin',
  Landlord: 'Landlord',
  Tenant: 'Tenant'
};

export const DIALOG_MESSAGE = {
  DELETE_CONFIRM: 'Are you sure you want to delete this item?',

  DELETE_SUCCESS: 'Delete successfully',
  DELETE_FAIL: 'Delete failed',

  UPDATE_SUCCESS: 'Update successfully',
  UPDATE_FAIL: 'Update failed',

  CREATE_SUCCESS: 'Create successfully',
  CREATE_FAIL: 'Create failed',

  UPLOAD_SUCCESS: 'Upload successfully',
  UPLOAD_FAIL: 'Upload failed'
};

export const DIALOG_BUTTON = {
  OK: 'Có',
  CANCEL: 'Để tui coi lại',
  YES: 'Yes',
  NO: 'No',
  SAVE: 'Save'
};

export const fadeInOut = (name = 'fadeInOut', duration = 0.1) =>
  trigger(name, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration}s ease-in-out`)
    ]),
    transition(':leave', [
      animate(`${duration}s ease-in-out`, style({ opacity: 0 }))
    ])
  ]);


  export const BOOKING_COLORS: Record<string, EventColor> = {
    booked: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    available: {
      primary: '#7ba5c5',
      secondary: '#7ba5c5'
    }
  };

  export const DEFAULT_IMAGES = {
    avatar: 'assets/images/default-avatar.png',
    property: 'assets/images/default-property.png',
    houseNoImage: 'assets/images/default/house_no_image.png',
  }


  export const TIME_SLOTS = [
    { label: '6:00', start: 6, end: 7 },
    { label: '7:00', start: 7, end: 8 },
    { label: '8:00', start: 8, end: 9 },
    { label: '9:00', start: 9, end: 10 },
    { label: '10:00', start: 10, end: 11 },
    { label: '11:00', start: 11, end: 12 },
    { label: '12:00', start: 12, end: 13 },
    { label: '13:00', start: 13, end: 14 },
    { label: '14:00', start: 14, end: 15 },
    { label: '15:00', start: 15, end: 16 },
    { label: '16:00', start: 16, end: 17 },
    { label: '17:00', start: 17, end: 18 },
    { label: '18:00', start: 18, end: 19 },
    { label: '19:00', start: 19, end: 20 },
    { label: '20:00', start: 20, end: 21 },
    { label: '21:00', start: 21, end: 22 },
    { label: '22:00', start: 22, end: 23 },
  ]


  export const WEEK_DAYS =  [
    {
      label: 'Thứ hai',
      value: 1
    },
    {
      label: 'Thứ ba',
      value: 2
    },
    {
      label: 'Thứ tư',
      value: 3
    },
    {
      label: 'Thứ năm',
      value: 4
    },
    {
      label: 'Thứ sáu',
      value: 5
    },
    {
      label: 'Thứ bảy',
      value: 6
    },
    {
      label: 'Chủ nhật',
      value: 0
    }
  ];