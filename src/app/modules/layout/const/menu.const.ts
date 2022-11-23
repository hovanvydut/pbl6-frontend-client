import { ENDPOINTS } from "@app/shared/utilities";

export const  menuItems = [
  {
    icon: 'home',
    name: 'Dashboard',
    link: ENDPOINTS.DASHBOARD
  },
  {
    icon: 'product',
    name: 'Quản lý bài đăng',
    link: ENDPOINTS.LANDLOR_MANAGE_POSTS
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
    icon: 'statistics',
    name: 'Thống kê',
    link: ENDPOINTS.LANDLOR_STATISTICS
  },

  {
    icon: 'messages',
    name: 'Đăng xuất',
    link: ENDPOINTS.LOGOUT
  },
];
