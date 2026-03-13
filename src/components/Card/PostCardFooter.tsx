import type { PostType } from "@/types/postsType";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import PostDetails from "../postDetails/PostDetails";
import { useEffect, useState } from "react";
import { addLike, savePost } from "@/services/interactionServices";
import { GoBookmarkFill } from "react-icons/go";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "@/services/userServices";
import SharePostDialog from "../sharePostDialog/SharePostDialog";
import PostLikesDialog from "../postLikesDialog/PostLikesDialog";

const PostCardFooter = ({ post }: { post: PostType }) => {
  const [isLiked, setIsLiked] = useState(() => {
    const storedLikes = localStorage.getItem(`liked-${post._id}`);
    return storedLikes ? JSON.parse(storedLikes) : false;
  });
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const storedPosts = localStorage.getItem(`saved-${post._id}`);
    return storedPosts ? JSON.parse(storedPosts) : false;
  });
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);
  const queryClient = useQueryClient();

  async function addNewLike(postId: string) {
    const response = await addLike(postId);
    const liked = response.data?.liked;
    setIsLiked(liked);
    console.log(response);
    setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
  }
  async function handleBookmark(postId: string) {
    try {
      const response = await savePost(postId);
      setIsBookmarked(response?.data?.bookmarked);
      toast.success(response?.data?.bookmarked ? "Saved!" : "Removed!");
      queryClient.invalidateQueries({ queryKey: ["getUserData"] });
    } catch (error) {
      console.log(error);
    }
  }
  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });

  useEffect(() => {
    localStorage.setItem(`liked-${post._id}`, JSON.stringify(isLiked));
    localStorage.setItem(`saved-${post._id}`, JSON.stringify(isBookmarked));
  }, [isLiked, isBookmarked, post._id]);

  return (
    <>
      <div className="flex items-center justify-between md:p-5">
        <span className="flex items-center gap-2">
          <PostLikesDialog likesCount={likesCount} post={post} />
        </span>
        <span
          className={`flex items-center gap-2 ${post.commentsCount >= 2 ? "text-blue-900" : ""}`}
        >
          <span className="cursor-pointer">
            {post.commentsCount <= 1 ? (
              "comment"
            ) : (
              <span>{post.commentsCount} comments</span>
            )}
          </span>
          <AiOutlineComment className="cursor-pointer" />
          {post.commentsCount >= 2 && <PostDetails post={post} />}
        </span>
      </div>
      <div className="flex items-center justify-between md:p-3 max-w-6xl gap-1 my-1">
        <button
          className={`flex-1 flex items-center justify-center gap-1 ${isLiked ? "liked" : "reactionsBtn"}`}
          onClick={() => addNewLike(post._id)}
        >
          <AiFillLike />
          <span className="hidden sm:inline">{isLiked ? "Liked" : "Like"}</span>
        </button>

        <div className="flex-1 flex items-center justify-center gap-1 reactionsBtn cursor-pointer">
          <AiOutlineComment />
          <span className="hidden sm:inline">
            <PostDetails post={post} comments />
          </span>
        </div>

        {post?.user?.name === userData?.name ? null : (
          <>
            <div className="flex-1 flex justify-center">
              <SharePostDialog post={post} />
            </div>

            <button
              className={`flex-1 flex items-center justify-center gap-1 ${isBookmarked ? "bookmarkedBtn" : "reactionsBtn"}`}
              onClick={() => handleBookmark(post._id)}
            >
              <GoBookmarkFill
                className={`${isBookmarked ? "text-blue-700 fill-blue-700 dark:fill-white" : ""}`}
              />
              <span className="hidden sm:inline">
                {isBookmarked ? "Saved" : "Save"}
              </span>
            </button>
          </>
        )}
      </div>
      {post.topComment && (
        <>
          <hr />
          <div className="gap-2 flex justify-between items-center m-3 md:m-2 p-2 rounded-2xl">
            <div className="flex items-center gap-2">
              <img
                src={post.topComment.commentCreator.photo}
                alt={post.topComment.commentCreator.name}
                className=" border border-violet-900 outline-offset-4 md:m-2 rounded-full md:size-10 size-6"
              />
              <div className="flex flex-col md:gap-1">
                <span className="font-bold text-sm md:text-md capitalize text-gray-800">
                  {post.topComment.commentCreator.name}
                </span>
                <p className="w-full rounded-lg text-sm md:text-md text-gray-800">
                  {post.topComment.content}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <div></div>
    </>
  );
};

export default PostCardFooter;
