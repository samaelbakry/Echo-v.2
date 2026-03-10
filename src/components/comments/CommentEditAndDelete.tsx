import { deleteComment } from "@/services/commentsServices";
import { getUserData } from "@/services/userServices";
import type { CommentType } from "@/types/commentsType";
import type { PostType } from "@/types/postsType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const CommentEditAndDelete = ({post,comment,setEditingCommentId,setEditContent}: {comment: CommentType;post: PostType; setEditingCommentId: React.Dispatch<React.SetStateAction<string | null>> ; setEditContent: React.Dispatch<React.SetStateAction<string>>}) => {
  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
  const queryClient = useQueryClient();

  async function handleDeleteComment(postId: string, commentId: string) {
    try {
      const response = await deleteComment(postId, commentId);
      console.log(response);
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["getAllComments", post._id] });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {comment?.commentCreator?._id === userData?._id && (
        <>
          <button
            className="flex items-center gap-1 text-green-800 font-light cursor-pointer"
            onClick={() => {
              setEditingCommentId(comment._id);
              setEditContent(comment.content);
            }}
          >
            <CiEdit />
            Edit
          </button>
        </>
      )}
      {(comment?.commentCreator?._id === userData?._id ||
        post?.user?._id === userData?._id) && (
        <button className="flex items-center gap-1 text-red-800 font-light cursor-pointer"
          onClick={() => handleDeleteComment(post._id, comment._id)}>
          <MdDelete />
          Delete
        </button>
      )}
    </>
  );
};

export default CommentEditAndDelete;
