import { PaymentHistory } from './../../payment/models/payment.model';
import { moduleType } from '@app/shared/app.enum';
import { MenuItem } from '@app/shared/models/menu.model';
import { ENDPOINTS } from '@app/shared/utilities';

export const menuItems: MenuItem[] = [
  new MenuItem({
    icon: 'home',
    name: 'Dashboard',
    link: ENDPOINTS.DASHBOARD,
    isVisible: true
  }),
  new MenuItem({
    type: moduleType.Notification,
    icon: 'notification',
    icon_active: 'notification_new',
    name: 'Thông báo',
    link: ENDPOINTS.NOTIFICATIONS,
    isVisible: false
  }),
  new MenuItem({
    type: moduleType.Post,
    icon: 'product',
    name: 'Quản lý bài đăng',
    link: ENDPOINTS.LANDLOR_MANAGE_POSTS,
    isVisible: false
  }),
  new MenuItem({
    type: moduleType.Statistic,
    icon: 'chart_vertical',
    name: 'Thống kê',
    link: ENDPOINTS.LANDLOR_STATISTICS,
    isVisible: false
  }),
  new MenuItem({
    type: moduleType.PaymentHistory,
    icon: 'billing',
    name: 'Nạp tiền',
    link: ENDPOINTS.USER_COIN,
    isVisible: false
  }),
  new MenuItem({
    type: moduleType.Booking,
    icon: 'messages',
    name: 'Lịch hẹn xem trọ',
    link: ENDPOINTS.USER_BOOKING_CALENDAR,
    isVisible: false
  }),
  new MenuItem({
    icon: 'logout',
    name: 'Đăng xuất',
    link: ENDPOINTS.LOGOUT,
    isVisible: true
  })
];
