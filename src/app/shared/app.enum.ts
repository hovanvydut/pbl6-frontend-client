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
  YDM = 'yyyy/dd/MM'
}

export enum SortingTypes {
  Ascending = 'asc',
  Descending = 'desc'
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
  Tel = 'tel'
}

export enum NotificationCode {
  REVIEW__HAS_REVIEW_ON_POST = 'REVIEW__HAS_REVIEW_ON_POST',
  BOOKING__HAS_BOOKING_ON_POST = 'BOOKING__HAS_BOOKING_ON_POST',
  BOOKING__HOST_CONFIRM_MET = 'BOOKING__HOST_CONFIRM_MET',
  BOOKING__HOST_APPROVE_MEETING = 'BOOKING__HOST_APPROVE_MEETING'
}

export enum NotificationContent {
  REVIEW__HAS_REVIEW_ON_POST = 'Bạn có một đánh giá mới',
  BOOKING__HAS_BOOKING_ON_POST = 'Bạn có một lịch hẹn xem trọ mới',
  BOOKING__HOST_CONFIRM_MET = 'Chủ nhà đã xác nhận bạn đến xem trọ',
  BOOKING__HOST_APPROVE_MEETING = 'Chủ nhà đã xác nhận lịch hẹn xem trọ'
}

export enum NotificationTypeIcon {
  REVIEW__HAS_REVIEW_ON_POST = 'star_fill',
  BOOKING__HAS_BOOKING_ON_POST = 'calendar_waiting',
  BOOKING__HOST_CONFIRM_MET = 'met',
  BOOKING__HOST_APPROVE_MEETING = 'calendar_approve'
}

export enum NotificationTypeColor {
  REVIEW__HAS_REVIEW_ON_POST = 'bg-yellow-200',
  BOOKING__HAS_BOOKING_ON_POST = 'bg-red-300',
  BOOKING__HOST_CONFIRM_MET = 'bg-green-300',
  BOOKING__HOST_APPROVE_MEETING = 'bg-blue-400'
}

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,
  UNSUPPORTED_MEDIA_TYPE = 415,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502
}

export enum PermissionType {
  // done
  BookingApproveMeeting = 'Booking.Approve.Meeting',
  BookingConfirmMet = 'Booking.Confirm.Met',
  BookingCreateMeeting = 'Booking.Create.Meeting',
  BookingViewAllBooked = 'Booking.View.All.Booked',
  BookingViewAllPersonal = 'Booking.View.All.Personal',

  BookmarkCreate = 'Bookmark.Create',
  BookmarkRemove = 'Bookmark.Remove',
  BookmarkView = 'Bookmark.View',

  // no
  ConfigSettingUpdate = 'ConfigSetting.Update',
  ConfigSettingViewAll = 'ConfigSetting.View.All',
  ConfigSettingViewOne = 'ConfigSetting.View.One',

  // done
  FreeTimeCreate = 'FreeTime.Create',
  FreeTimeViewAll = 'FreeTime.View.All',

  // done
  NotificationUpdate = 'Notification.Update',
  NotificationViewAll = 'Notification.View.All',

  // done
  PaymentViewAllHistory = 'Payment.View.All.History',
  PaymentViewAllHistoryPersonal = 'Payment.View.All.History.Personal',
  
  // no
  PermissionCreate = 'Permission.Create',
  PermissionRemove = 'Permission.Remove',
  PermissionView = 'Permission.View',

  // done
  PostCheckDuplicateUptop = 'Post.Check.Duplicate.Uptop',
  PostCreate = 'Post.Create',
  PostCreateUptop = 'Post.Create.Uptop',
  PostDelete = 'Post.Delete',
  PostGetUptop = 'Post.Get.Uptop',
  PostUpdate = 'Post.Update',
  PostViewAllPersonal = 'Post.View.All.Personal',

  // done 
  PostStatisticViewDetailInDate = 'PostStatistic.View.Detail.In.Date',
  PostStatisticViewInDateRange = 'PostStatistic.View.In.Date.Range',
  PostStatisticViewTopInDate = 'PostStatistic.View.Top.In.Date',
  
  // done
  ReviewCheckCanReview = 'Review.Check.Can.Review',
  ReviewCreate = 'Review.Create',

  // no
  RoleCreate = 'Role.Create',
  RoleUpdate = 'Role.Update',
  RoleViewAll = 'Role.View.All',
  RoleViewOne = 'Role.View.One',

  // done
  UserUpdateAccountAccess = 'User.Update.Account.Access',
  UserUpdateProfile = 'User.Update.Profile',
  UserViewAccountAccess = 'User.View.Account.Access',
  UserViewAll = 'User.View.All',
  UserViewPersonal = 'User.View.Personal',

  // no
  UserStatisticViewDetailInDate = 'UserStatistic.View.Detail.In.Date',
  UserStatisticViewInDateRange = 'UserStatistic.View.In.Date.Range',
  UserStatisticViewTopInDate = 'UserStatistic.View.Top.In.Date',

  // done
  VNPCreatePayment = 'VNP.Create.Payment',
  VNPViewAllHistory = 'VNP.View.All.History',
  VNPViewAllHistoryPersonal = 'VNP.View.All.History.Personal'
}


export enum moduleType {
  Booking = 1,
  Notification,
  Post,
  Statistic,
  Payment,
  PaymentHistory,
  Review,
  Uptop,
  AccountSetting,
  Bookmark,
}

export enum RegisterStep {
  selectRole = 1,
  fillInfo
}