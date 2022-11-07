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
  message: 'assets/images/default/message.png',
  thanks: 'assets/images/default/thanks.png',
  login:  'assets/images/default/login.png',
};

export const TIME_SLOTS = [
  { label: '6 AM', start: 6, end: 7 },
  { label: '7 AM', start: 7, end: 8 },
  { label: '8 AM', start: 8, end: 9 },
  { label: '9 AM', start: 9, end: 10 },
  { label: '10 AM', start: 10, end: 11 },
  { label: '11 AM', start: 11, end: 12 },
  { label: '12 AM', start: 12, end: 13 },
  { label: '1 PM', start: 13, end: 14 },
  { label: '2 PM', start: 14, end: 15 },
  { label: '3 PM', start: 15, end: 16 },
  { label: '4 PM', start: 16, end: 17 },
  { label: '5 PM', start: 17, end: 18 },
  { label: '6 PM', start: 18, end: 19 },
  { label: '7 PM', start: 19, end: 20 },
  { label: '8 PM', start: 20, end: 21 },
  { label: '9 PM', start: 21, end: 22 },
  { label: '10 PM', start: 22, end: 23 }
];

export const WEEK_DAYS = [
  {
    label: 'Monday',
    value: 1
  },
  {
    label: 'Tuesday',
    value: 2
  },
  {
    label: 'Wednesday',
    value: 3
  },
  {
    label: 'Thursday',
    value: 4
  },
  {
    label: 'Friday',
    value: 5
  },
  {
    label: 'Saturday',
    value: 6
  },
  {
    label: 'Sunday',
    value: 0
  }
];
