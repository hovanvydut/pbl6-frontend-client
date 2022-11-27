import { ENDPOINTS } from '@app/shared/utilities';

export const menuItems = [
  {
    icon: 'home',
    name: 'Dashboard',
    link: ENDPOINTS.DASHBOARD
  },
  {
    icon: 'notification',
    icon_active: 'notification_new',
    name: 'Thông báo',
    link: ENDPOINTS.NOTIFICATIONS
  },
  {
    icon: 'product',
    name: 'Quản lý bài đăng',
    link: ENDPOINTS.LANDLOR_MANAGE_POSTS
  },
  {
    icon: 'chart_vertical',
    name: 'Thống kê',
    link: ENDPOINTS.LANDLOR_STATISTICS
  },
  {
    icon: 'billing',
    name: 'Nạp tiền',
    link: ENDPOINTS.USER_COIN
  },
  {
    icon: 'messages',
    name: 'Lịch hẹn xem trọ',
    link: ENDPOINTS.USER_BOOKING_CALENDAR
  },
  {
    icon: 'logout',
    name: 'Đăng xuất',
    link: ENDPOINTS.LOGOUT
  }
];
