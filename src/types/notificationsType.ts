import type { TopCommentType } from "./postsType";

export type AllNotificationsType = {
  success: boolean;
  message: string;
  data: NotificationsDataType;
  meta: Meta;
};

export type NotificationsDataType = {
  notifications: Notification[];
};

export type NotificationType = {
  _id: string;
  recipient: RecipientType;
  actor: ActorType;
  type: string;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  entity: EntityType;
};

export type RecipientType = {
  _id: string;
  name: string;
  photo: string;
};

export type ActorType = {
  _id: string;
  name: string;
  photo: string;
};

export type EntityType = {
  _id: string;
  body: string;
  user: string;
  commentsCount: number;
  topComment: TopCommentType;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
};
export type CommentCreatorType = {
  _id: string;
  name: string;
  photo: string;
};

export type Meta = {
  feedMode: string;
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
};
