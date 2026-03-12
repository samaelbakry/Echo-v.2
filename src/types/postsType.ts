export type DataType = {
  success: boolean;
  message: string;
  data: PostDatatype;
};

export type PostDatatype = {
  posts: PostType[];
};

export type PostType = {
  _id: string;
  body: string;
  image?: string;
  cover?: string;
  privacy: string;
  user: UserType;
  sharedPost: any;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment?: TopCommentType;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
};

export type UserType = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};

export type TopCommentType = {
  _id: string;
  content: string;
  commentCreator: CommentCreatorType;
  post: string;
  parentComment: any;
  likes: any[];
  createdAt: string;
};

export type CommentCreatorType = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};
