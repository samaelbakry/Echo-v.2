import type { PostType } from "@/types/postsType";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";
import PostDetails from "../postDetails/PostDetails";

const PostCardFooter = ({ post }: { post: PostType }) => {


  return (
    <>
      <div className="flex items-center justify-between p-5">
        <span className="flex items-center gap-2">
          {post.likesCount} likes
          <AiFillLike />
        </span>
        <span className={`flex items-center gap-2 ${post.commentsCount >=2 ?"text-blue-900" : ""}`}>
          <span className="cursor-pointer">{post.commentsCount  <=1 ? "comment" : <span>{post.commentsCount} comments</span> }</span> 
          <AiOutlineComment className="cursor-pointer" />
           {post.commentsCount >=2 && <PostDetails post={post}/>}
        </span>
      </div>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2 reactionsBtn ">
          like
          <AiFillLike />
        </div>
        <div className="flex items-center gap-2 reactionsBtn">
          comment
          <AiOutlineComment />
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
