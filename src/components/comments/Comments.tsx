import { getAllComments } from "@/services/commentsServices";
import type { AllCommentsDataType, CommentType } from "@/types/commentsType";
import type { PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";

const Comments = ({ post }: { post: PostType }) => {

const { data: allComments = [], isLoading } = useQuery< AllCommentsDataType, Error, CommentType[]>({

  queryKey: ["getAllComments", post._id],
  queryFn: () => getAllComments(post._id),
  select: (data) => data.data.comments,
});

  return <>
  {isLoading ? <>
      <p className="text-center text-base bg-blur text-gray-700 p-3 my-3"> <Spinner className="size-6 inline-block mr-1"/>Loading....</p>
      </>
     : <>
      { allComments.map((comment)=>(
        <React.Fragment key={comment._id}>
        <div className="flex gap-3 m-2 bg-blur rounded-2xl p-4 text-gray-600">
          <img src={comment.commentCreator.photo}alt={comment?.commentCreator?.name}
          className="w-8 h-8 rounded-full border border-violet-900 shrink-0"/>
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-semibold text-gray-800">
           {comment?.commentCreator?.name}
          </span>
       {comment?.content && (
        <span className="text-sm leading-relaxed">
        {comment?.content}
        </span> )}
         {comment.image && (<img src={comment.image}className="max-h-56 mt-2 rounded-xl object-cover"/>)}
        </div>
        </div>
        
        </React.Fragment>
      )) }
      </>}
  </>
}

export default Comments
