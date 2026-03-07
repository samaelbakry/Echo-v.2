import type { PostType } from "@/types/postsType";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";
import PostDetails from "../postDetails/PostDetails";
import { addLike } from "@/services/postsServices";
import { useState } from "react";

const PostCardFooter = ({ post }: { post: PostType }) => {
  const [isLiked, setIsLiked] = useState<boolean>()
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);

 async function getNewLike(postId:string) {
    const response = await addLike(postId)
    const liked = response.data?.liked
    setIsLiked(liked);
    console.log(response);
    setLikesCount((prev)=>(liked ? prev + 1 : prev - 1))
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
        <div className="flex items-center gap-2 reactionsBtn">
          share
          <FaShare />
        </div>
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
