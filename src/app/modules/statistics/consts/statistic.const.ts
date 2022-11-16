import { StatisticKey } from './../enums/statistic.enum';

export const StatisticTypes = [
    {
        key: StatisticKey.Booking,
        name: 'Số lượt đặt lịch xem trọ',
        yaxis: 'Lượt đặt lịch',
    },
    {
        key: StatisticKey.Bookmark,
        name: 'Số lượt lưu bài viết',
        yaxis: 'Lượt lưu bài viết',
    },
    {
        key: StatisticKey.GuestMetMotel,
        name: 'Số lượt đến xem trọ thành công',
        yaxis: 'Lượt đến',
    },
    {
        key: StatisticKey.ViewPostDetail,
        name: 'Số lượt xem chi tiết bài đăng',
        yaxis: 'Lượt xem',
    }
]