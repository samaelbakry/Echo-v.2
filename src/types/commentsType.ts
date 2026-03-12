import type { CommentCreatorType } from "./postsType";

export type AllCommentsDataType = {
  success: boolean;
  message: string;
  data: CommentsDataType;
  meta: Meta;
};

export type CommentsDataType = {
  comments: CommentType[];
};

export type CommentType = {
  _id: string;
  content: string;
  commentCreator: CommentCreatorType;
  post: string;
  parentComment: any;
  likes: any[];
  image?: string;
  createdAt: string;
  repliesCount: number;
};

export type Meta = {
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
};
