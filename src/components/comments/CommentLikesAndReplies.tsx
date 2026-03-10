import { likeComment } from "@/services/commentsServices";
import type { CommentType } from "@/types/commentsType";
import type { PostType } from "@/types/postsType";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const CommentLikesAndReplies = ({post,comment,}: {comment: CommentType;post: PostType;}) => {
  const [isLiked, setIsLiked] = useState(() => {
    const storedLikes = localStorage.getItem(`liked-comment${post._id}`);
    return storedLikes ? JSON.parse(storedLikes) : false;
  });
  const [commentLikesCount, setCommentLikesCount] = useState();
  const queryClient = useQueryClient();
  async function handleLikeComment(postId: string, commentId: string) {
    try {
      const response = await likeComment(postId, commentId);
      setCommentLikesCount(response?.data?.likesCount);
      setIsLiked(response?.data?.liked);
      queryClient.invalidateQueries({ queryKey: ["getAllComments", post._id] });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    localStorage.setItem(`liked-comment${post._id}`, JSON.stringify(isLiked));
  }, [isLiked]);
  return (
    <>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          className={`flex items-center gap-1 cursor-pointer ${isLiked ? "text-blue-600 font-semibold" : ""}`}
          onClick={() => {
            handleLikeComment(post._id, comment._id);
          }}
        >
          👍{isLiked ? "liked" : "like"}
          <span>{commentLikesCount}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          💬 Reply
        </button>
      </div>
    </>
  );
};

export default CommentLikesAndReplies;
