import { ItemModel } from "@app/shared/models/base.model";
import { PostTab } from "../enums/post.enum";

export const POST_TABS = [
    new ItemModel({
      name: 'Tất cả bài đăng',
      id: PostTab.All
    }),
    new ItemModel({
      name: 'Bài đăng uptop',
      id: PostTab.Uptop
    }),
    new ItemModel({
      name: 'Bài đăng đã xoá',
      id: PostTab.Deleted
    })
  ]