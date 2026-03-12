import { getCommentReplies } from "@/services/commentsServices";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";

const Replies = ({ postId, commentId }:{postId:string , commentId:string}) => {

 const { data: replies = [], isLoading } = useQuery({
   queryKey: ["commentReplies", commentId],
   queryFn: () => getCommentReplies(postId, commentId),
   select: (data) => data.data.replies
 });


 return (
   <div className="ml-2 mt-3 flex flex-col gap-3">
    {isLoading ? <p className="flex items-center gap-2 bg-blue p-2"> <Spinner/>Loading... </p>:  <>
    {replies.map((reply:any) => (
       <div key={reply._id} className="flex gap-2">
         <img
           src={reply.commentCreator.photo}
           className="w-6 h-6 rounded-full"
         />

         <div className="bg-blur p-2 w-full rounded-xl">
           <span className="font-semibold text-sm m-1">
             {reply.commentCreator.name}
           </span>

           <p className="text-sm m-1">{reply.content}</p>

           {reply.image && (
             <img
               src={reply.image}
               className="object-cover rounded-lg mt-2"
             />
           )}
         </div>

       </div>
     ))}
    </>}
     
   </div>
 );
};

export default Replies;