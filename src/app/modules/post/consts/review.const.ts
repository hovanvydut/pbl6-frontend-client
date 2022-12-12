import { ReviewType } from "../enums/review-type.enum";

export const ReviewIcons = [
  {
    id: ReviewType.Positive,
    icon: 'smile_plus',
    image: '/assets/star.png',
    text: 'Bình luận này mang tính chất tích cực'
  },
  {
    id: ReviewType.Neutral,
    icon: 'smile',
    image: '/assets/smile.png',
    text: 'Bình luận này bình thường'
  },
  {
    id: ReviewType.Negative,
    icon: 'frown',
    image: '/assets/sad.png',
    text: 'Bình luận này mang tính chất tiêu cực'
  },
  {
    id: null,
    icon: 'question',
    text: 'Chưa có đánh giá'
  }
];
