export enum AppColor {
  DefaultColor = '#00AFFF'
}

export enum Feature {
  AccountInfo = 'AccountInfo',
  Users = 'Users',
  ManagedAccount = 'ManagedAccount',
}

export enum AppEnvironments {
  Local = 'local',
  Dev = 'dev',
  QA = 'qa',
  Prod = 'prod'
}

export enum AppErrorCode {
  Error,
  Warning,
  Info
}

export enum UserPageName {
  conversation = 'Conversation',
  AccountSetting = 'AccountSetting',
  Users = 'Users',
  ManageAccount = 'ManageAccount',
  //
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
