import { createReply, getCommentReplies, likeComment } from "@/services/commentsServices";
import type { CommentType } from "@/types/commentsType";
import type { PostType } from "@/types/postsType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { IoIosSend } from "react-icons/io";
import { TiAttachment } from "react-icons/ti";
import { toast } from "react-toastify";
import Replies from "./Replies";
import { RiArrowDownDoubleFill } from "react-icons/ri";

const CommentLikesAndReplies = ({post,comment,}: {comment: CommentType;post: PostType;}) => {
  const [isLiked, setIsLiked] = useState(() => {
    const storedLikes = localStorage.getItem(`liked-comment${post._id}`);
    return storedLikes ? JSON.parse(storedLikes) : false;
  });

  const [commentLikesCount, setCommentLikesCount] = useState();
  const [openRepliesInput, setOpenRepliesInput] = useState(false)
  const [openReplies, setOpenReplies] = useState(false)
  const [replyImage, setReplyImage] = useState<File | null>(null)
  const [replyInputContent, setReplyInputContent] = useState("")
  const controlInput = useRef<HTMLInputElement | null>(null)
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

 function makeInputOpen(){
    controlInput.current?.click()
  }
   function chooseFile(){
    const file = controlInput.current?.files?.[0] || null
    setReplyImage(file)
  }

  async function sendCommentReply(postId:string , commentId:string){
    const formData = new FormData()
    formData.append("content" , replyInputContent);
    if (replyImage) {
    formData.append("image", replyImage);
     }
    try {
      const response = await createReply(postId , commentId , formData)
      console.log(response);
      toast.success(response?.message)
       setOpenRepliesInput(false)
      setReplyInputContent("")
      queryClient.invalidateQueries({ queryKey: ["commentReplies", comment._id] });
    } catch (error) {
      console.log(error);
    }
  }
  const { data: replies} = useQuery({
   queryKey: ["commentReplies", comment._id],
   queryFn: () => getCommentReplies(post._id, comment._id),
   select: (data) => data.data.replies
 });


  return (
    <>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button
          className={`flex items-center gap-1 cursor-pointer ${isLiked ? "text-blue-600 font-semibold" : ""}`}
          onClick={() => {handleLikeComment(post._id, comment._id);}}
        >
          👍{isLiked ? "liked" : "like"}
          <span>{commentLikesCount}</span>
        </button>
        <button className={`flex items-center gap-1 hover:text-blue-600 ${openRepliesInput ? "text-blue-600"  : ""}`} onClick={()=>{setOpenRepliesInput((open)=>(!open))}}>
          💬 Reply
        </button>
      </div>
       {openRepliesInput && <>
        <div className="flex items-center gap-2">
          <Input value={replyInputContent}  onChange={(e)=>(setReplyInputContent(e.target.value))} className="flex-1 rounded-2xl border-gray-300 shadow"/> 
           <button onClick={()=>sendCommentReply(post._id , comment._id)} className="bg-blue-200 p-1 rounded-2xl hover:bg-blue-700 hover:text-white duration-500 cursor-pointer shadow">
                 <IoIosSend className="text-xl" />  
           </button>
           <button className="bg-blue-200 p-1 rounded-2xl hover:bg-blue-700 hover:text-white duration-500 cursor-pointer shadow">
                 <input ref={controlInput} type="file" onChange={chooseFile} className="hidden" />
                 <TiAttachment  onClick={makeInputOpen} className="text-xl" />  
           </button>
        </div>
        </>}
        { replies?.length >=1 ? <button className="text-gray-600 font-bold cursor-pointer flex items-center gap-1" onClick={()=>{setOpenReplies((open)=>(!open))}}>View replies <RiArrowDownDoubleFill /> </button>: ""}
        {openReplies && <Replies commentId={comment._id} postId={post._id} />}

    </>
  );
};

export default CommentLikesAndReplies;
