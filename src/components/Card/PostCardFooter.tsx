import type { PostType } from "@/types/postsType";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";
import PostDetails from "../postDetails/PostDetails";
import { useState } from "react";
import { addLike, savePost } from "@/services/interactionServices";
import { GoBookmarkFill } from "react-icons/go";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";


const PostCardFooter = ({ post }: { post: PostType }) => {
  const [isLiked, setIsLiked] = useState<boolean>()
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);
  const queryClient =useQueryClient()


 async function getNewLike(postId:string) {
    const response = await addLike(postId)
    const liked = response.data?.liked
    setIsLiked(liked);
    console.log(response);
    setLikesCount((prev)=>(liked ? prev + 1 : prev - 1))
  }
 async function handleBookmark(postId:string){
  try {
     const response = await savePost(postId)
    setIsBookmarked(response?.data?.bookmarked)
    toast.success(response?.data?.bookmarked ? "Saved!" : "Removed!")
    queryClient.invalidateQueries({queryKey:["getUserData"]})
  } catch (error) {
    console.log(error);
  }
  }
 
  return (
    <>
      <div className="flex items-center justify-between p-5">
        <span className="flex items-center gap-2">
          {likesCount} {likesCount <=1 ? "like" :"likes"} 
          <AiFillLike className="text-blue-800" />
        </span>
        <span className={`flex items-center gap-2 ${post.commentsCount >=2 ?"text-blue-900" : ""}`}>
          <span className="cursor-pointer">{post.commentsCount  <=1 ? "comment" : <span>{post.commentsCount} comments</span> }</span> 
          <AiOutlineComment className="cursor-pointer" />
           {post.commentsCount >=2 && <PostDetails post={post}/>}
        </span>
      </div>
      <div className="flex items-center justify-between p-3">
        <button className={`flex items-center gap-2 ${isLiked ? "liked" : "reactionsBtn"} `} onClick={()=>getNewLike(post._id)}>
         {isLiked ? "liked" : "like"}
          <AiFillLike />
        </button>
        <div className="flex items-center gap-2 reactionsBtn cursor-pointer">
          <AiOutlineComment />
          <PostDetails post={post} comments/>
        </div>
        <button className="flex items-center gap-2 reactionsBtn">
          Share
          <FaShare />
        </button>
        <button className={`flex items-center gap-2  ${isBookmarked ? "bookmarkedBtn" : "reactionsBtn" }`} onClick={()=>handleBookmark(post._id)}>
          {isBookmarked ? "Saved" : "Save"}
          <GoBookmarkFill className={`${isBookmarked ?  "text-blue-700 fill-blue-700" : ""}`} />
        </button>
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

      <div>
        
      </div>
    </>
  );
};

export default PostCardFooter;
