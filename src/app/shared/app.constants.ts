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