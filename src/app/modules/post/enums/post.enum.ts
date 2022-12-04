export enum PostGroupName {
  GeneralInfo = 'Thông tin chung',
  Address = 'Địa chỉ',
  DetailInfo = 'Thông tin chi tiết',
  AdditionalInfo = 'Thông tin thêm'
}

export enum FieldType {
  Property = 'property',
  Textarea = 'textarea',
  Input = 'input',
  Select = 'select',
  Image = 'image',
}

export enum PostActionType {
  create_post = 'Tạo bài viết',
  uptop_post = 'Đẩy tin nổi bật'
}

export enum PostTab {
  All = 'all',
  Uptop = 'uptop',
  Deleted = 'deleted'
}