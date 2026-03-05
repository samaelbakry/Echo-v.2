import { getSinglePostId } from "@/services/postsServices";
import type { PostType } from "@/types/postsType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import PostCardHeader from "../Card/PostCardHeader";
import PostCardBody from "../Card/PostCardBody";
import Comments from "../comments/Comments";
import { Input } from "../ui/input";
import { IoIosSend } from "react-icons/io";
import { TiAttachment } from "react-icons/ti";
import { createComment } from "@/services/commentsServices";
import { Spinner } from "../ui/spinner";
import { toast } from "react-toastify";


const PostDetails = ({ post , comments}: { post: PostType , comments?:boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const queryClient =useQueryClient()
    const { data } = useQuery({
    queryKey: ["getSinglePost", post._id],
    queryFn: () => getSinglePostId(post._id),
    enabled: isOpen,
  });

  const [commentContent , setCommentContent] =useState<string>("")
  const [commentImage , setCommentImage] =useState<File | null >(null)
  const attachCommentImage = useRef<HTMLInputElement | null>(null);

  function makeInputOpen(){
    attachCommentImage.current?.click()
  }

   function chooseFile(){
    const file = attachCommentImage.current?.files?.[0] || null
    setCommentImage(file)
  }

   function getComment(e: React.ChangeEvent<HTMLInputElement>) {
    setCommentContent(e.target.value);
  }

  async function sendComment(){
    const formData = new FormData()
    if(commentContent){
      formData.append("content" , commentContent)
    }
    if(commentImage){
      formData.append("image" , commentImage)
    }
    try {
      setIsLoading(true)
      const response = await createComment(post._id , formData)      
      console.log(response);
      queryClient.invalidateQueries({queryKey:["getAllComments"]})
      setCommentContent("")
      setCommentImage(null)
      attachCommentImage.current!.value = ""
      toast.success("comment added ")
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }

  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="cursor-pointer">
           {comments ? "Comments" : "view"}
        </DialogTrigger>
        <DialogContent className="md:max-w-2xl bg-blue-100 max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              <PostCardHeader post={post}/>
            </DialogTitle>
            <DialogDescription className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
             <div className="flex-1 overflow-y-auto px-4 no-scrollbar">
               <PostCardBody post={post}/>
              <div className="flex items-center  my-3 gap-2">
                <Input value={commentContent} onChange={(e)=>getComment(e)} className="flex-1 rounded-2xl border-gray-300 shadow"/>
                 <button onClick={makeInputOpen} className="bg-blue-200 p-1 rounded-2xl hover:bg-blue-700 hover:text-white duration-500 cursor-pointer shadow">
                  <input ref={attachCommentImage} onChange={chooseFile} type="file" className="hidden"/>
                  <TiAttachment  className="text-3xl" />
                </button>
                <button disabled={isLoading} onClick={sendComment} className="bg-blue-200 p-1 rounded-2xl hover:bg-blue-700 hover:text-white duration-500 cursor-pointer shadow">
                 {isLoading ? <Spinner className="text-3xl"/> : <IoIosSend className="text-3xl" /> } 
                </button>
              </div>
              <div className="p-2">
                {commentImage && <img src={URL.createObjectURL(commentImage)} alt="image" className="h-30 object-cover rounded-2xl"/> }
              </div>
              <Comments post={post}/>
             </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDetails;

