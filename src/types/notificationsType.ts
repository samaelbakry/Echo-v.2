import type { TopCommentType } from "./postsType"

export interface AllNotificationsType {
  success: boolean
  message: string
  data: NotificationsDataType
  meta: Meta
}

export interface NotificationsDataType {
  notifications: Notification[]
}

export interface NotificationType {
  _id: string
  recipient: RecipientType
  actor: ActorType
  type: string
  entityType: string
  entityId: string
  isRead: boolean
  createdAt: string
  entity: EntityType
}

export interface RecipientType {
  _id: string
  name: string
  photo: string
}

export interface ActorType {
  _id: string
  name: string
  photo: string
}

export interface EntityType {
  _id: string
  body: string
  user: string
  commentsCount: number
  topComment: TopCommentType
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
}
export interface CommentCreatorType {
  _id: string
  name: string
  photo: string
}

export interface Meta {
  feedMode: string
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  limit: number
  total: number
  numberOfPages: number
}
