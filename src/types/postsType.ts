export interface DataType {
  success: boolean
  message: string
  data: PostDatatype
}

export interface PostDatatype {
  posts: PostType[]
}

export interface PostType {
  _id: string
  body: string
  image?: string
  privacy: string
  user: UserType
  sharedPost: any
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment?: TopCommentType
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface UserType {
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopCommentType {
  _id: string
  content: string
  commentCreator: CommentCreatorType
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
}

export interface CommentCreatorType {
  _id: string
  name: string
  username: string
  photo: string
}