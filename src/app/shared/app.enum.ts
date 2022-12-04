export enum AppEnvironments {
  Local = 'local',
  Dev = 'dev',
  Prod = 'prod'
}

export enum Days {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export enum DateRangeTypes {
  Today = 'Today',
  LastSevenDays = 'Last 7 Days',
  ThisWeek = 'This Week',
  LastWeek = 'Last Week',
  ThisMonth = 'This Month',
  LastMonth = 'Last Month',
  LastThreeMonths = 'Last 3 Months',
  AllTime = 'All Time',
  Custom = 'Custom Range'
}

export enum DateFormatTypes {
  MDY = 'MM/dd/yyyy',
  DMY = 'dd/MM/yyyy',
  MMMDY = 'MMM/dd/yyyy',
  YMD = 'yyyy/MM/dd',
  YDM = 'yyyy/dd/MM',
}

export enum SortingTypes {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum InputType {
  Text = 'text',
  Number = 'number',
  Date = 'date',
  Time = 'time',
  DateTime = 'datetime',
  Email = 'email',
  Password = 'password',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Select = 'select',
  TextArea = 'textarea',
  File = 'file',
  Image = 'image',
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
  Range = 'range',
  Color = 'color',
  Url = 'url',
  Tel = 'tel',
}


export enum NotificationCode {
  REVIEW__HAS_REVIEW_ON_POST = 'REVIEW__HAS_REVIEW_ON_POST',
  BOOKING__HAS_BOOKING_ON_POST = 'BOOKING__HAS_BOOKING_ON_POST',
  BOOKING__HOST_CONFIRM_MET = 'BOOKING__HOST_CONFIRM_MET',
  BOOKING__HOST_APPROVE_MEETING = 'BOOKING__HOST_APPROVE_MEETING',
}


export enum NotificationContent {
  REVIEW__HAS_REVIEW_ON_POST = 'Bạn có một đánh giá mới',
  BOOKING__HAS_BOOKING_ON_POST = 'Bạn có một đơn đặt phòng mới',
  BOOKING__HOST_CONFIRM_MET = 'Chủ nhà đã xác nhận đã gặp bạn',
  BOOKING__HOST_APPROVE_MEETING = 'Chủ nhà đã xác nhận lịch hẹn',
}

export enum NotificationTypeIcon {
  REVIEW__HAS_REVIEW_ON_POST = 'star_fill',
  BOOKING__HAS_BOOKING_ON_POST = 'calendar_waiting',
  BOOKING__HOST_CONFIRM_MET = 'met',
  BOOKING__HOST_APPROVE_MEETING = 'calendar_approve',
}

export enum NotificationTypeColor {
  REVIEW__HAS_REVIEW_ON_POST = 'bg-yellow-200',
  BOOKING__HAS_BOOKING_ON_POST = 'bg-red-300',
  BOOKING__HOST_CONFIRM_MET = 'bg-green-300',
  BOOKING__HOST_APPROVE_MEETING = 'bg-blue-400',
}