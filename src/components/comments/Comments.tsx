import {getAllComments,updateComment,} from "@/services/commentsServices";
import type { AllCommentsDataType, CommentType } from "@/types/commentsType";
import type { PostType } from "@/types/postsType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "../ui/spinner";
import CommentLikesAndReplies from "./CommentLikesAndReplies";
import CommentEditAndDelete from "./CommentEditAndDelete";

const Comments = ({ post }: { post: PostType }) => {
  const [editingCommentId, setEditingCommentId] = React.useState<string | null>(null,);
  const [editContent, setEditContent] = React.useState("");
 
  const { data: allComments = [], isLoading } = useQuery<AllCommentsDataType,Error,CommentType[]>({
    queryKey: ["getAllComments", post._id],
    queryFn: () => getAllComments(post._id),
    select: (data) => data.data.comments,
  });
   const queryClient = useQueryClient();
   
  const { mutate: updateCommentMutate, isPending } = useMutation({
    mutationFn: ({commentId,formData,}: {commentId: string;formData: FormData;
    }) => updateComment(post._id, formData, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllComments", post._id] });
    },
  });
  return (
    <>
      {isLoading ? (
        <>
          <p className="text-center text-base bg-blur text-gray-700 p-3 my-3">
            {" "}
            <Spinner className="size-6 inline-block mr-1" />
            Loading....
          </p>
        </>
      ) : (
        <>
          {allComments.map((comment) => (
            <React.Fragment key={comment._id}>
              <div className="flex gap-3 m-2 bg-blur rounded-2xl p-5 text-gray-600">
                <img
                  src={comment.commentCreator.photo}
                  alt={comment?.commentCreator?.name}
                  className="w-8 h-8 rounded-full border border-violet-900 shrink-0"
                />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between font-semibold text-gray-800">
                    <span>{comment?.commentCreator?.name}</span>
                    <div className="flex items-center gap-2">
                    <CommentEditAndDelete setEditingCommentId={setEditingCommentId} setEditContent={setEditContent} comment={comment} post={post} />
                    </div>
                  </div>
                  {editingCommentId === comment._id ? (
                    <>
                      <div className="flex gap-2">
                        <input
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="flex-1 rounded-2xl border-gray-300 shadow p-2"
                        />
                        <button
                          onClick={() => {
                            const formData = new FormData();
                            formData.append("content", editContent);
                            updateCommentMutate({
                              commentId: comment._id,
                              formData,
                            });
                            setEditingCommentId(null);
                          }}
                        >
                          {isPending ? <Spinner /> : "save"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <span className="text-sm leading-relaxed">
                      {comment?.content}
                    </span>
                  )}
                  {comment.image && (
                    <img
                      src={comment.image}
                      className="max-h-56 mt-2 rounded-xl object-cover"
                    />
                  )}
                <CommentLikesAndReplies comment={comment} post={post}/>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default Comments;
