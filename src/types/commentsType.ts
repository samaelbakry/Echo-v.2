import type { CommentCreatorType } from "./postsType"

export interface AllCommentsDataType {
  success: boolean
  message: string
  data: CommentsDataType
  meta: Meta
}

export interface CommentsDataType {
  comments: CommentType[]
}

export interface CommentType {
  _id: string
  content: string
  commentCreator: CommentCreatorType
  post: string
  parentComment: any
  likes: any[]
  image?:string
  createdAt: string
  repliesCount: number
}


export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  limit: number
  total: number
  numberOfPages: number
}