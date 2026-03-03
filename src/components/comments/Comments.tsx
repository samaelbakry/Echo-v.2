import { getAllComments } from "@/services/commentsServices";
import type { AllCommentsDataType, CommentType } from "@/types/commentsType";
import type { PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Comments = ({ post }: { post: PostType }) => {

const { data: allComments = [], isLoading } = useQuery< AllCommentsDataType, Error, CommentType[]>({

  queryKey: ["getAllComments", post._id],
  queryFn: () => getAllComments(post._id),
  select: (data) => data.data.comments,
});

  return <>
  {isLoading ? <>
      <p className="text-center text-base bg-blur text-gray-700 p-3">Loading....</p>
      </>
     : <>
      { allComments.map((comment)=>(
        <React.Fragment key={comment._id}>
        <div className="flex items-center justify-between flex-wrap gap-3 m-2 bg-blur rounded-2xl p-2 text-gray-500">
          <div className="flex gap-3 items-center">
            <img src={comment.commentCreator.photo} alt={comment?.commentCreator?.name} className="size-8 rounded-2xl border border-violet-900 outline-offset-4" />
            <div className="flex flex-col flex-wrap">
            <span>{comment?.commentCreator?.name}</span>
            <span>{comment?.content}</span>
           </div>
          </div>      
        </div>
        
        </React.Fragment>
      )) }
      </>}
  </>
}

export default Comments
