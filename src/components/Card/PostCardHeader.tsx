import { getUserData } from "@/services/userServices";
import type { PostType } from "@/types/postsType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {  useState } from "react";
import { deletePost } from "@/services/postsServices";
import { toast } from "react-toastify";
import UpdatePostDialog from "../updatePostDialog/UpdatePostDialog";

const PostCardHeader = ({ post }: { post: PostType }) => {

  const [open, setOpen] = useState<boolean>(false);
  const queryClient =useQueryClient()
  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
  const handleDelete = async () => {
    const response =await deletePost(post._id)
    toast.success("post deleted Successfully!")
    queryClient.invalidateQueries({queryKey:["getAllPosts"]})
  };


  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2 items-center">
          <img
            className="size-10 object-cover rounded-full"
            src={post.user.photo}
            alt={post.user.name}
          />
          <div className="flex flex-col gap-1">
            <div className="capitalize flex items-center gap-2 text-blue-900 text-sm">
              {post.user.name} - @{post.user.username} 
              {post.user.name === userData.name ? " " : <>
               <button className="followBtn">
                <span className="font-bold">follow</span>
              </button>
              </>}
             
            </div>
            <span className="text-sm">
              {new Date(post.createdAt).toLocaleString("en-us", {
                timeStyle: "short",
                dateStyle: "medium",
              })}
            </span>
          </div>
        </div>
        <div className="px-3">
          {post.user.name === userData.name && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <HiDotsHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {setOpen((open)=>!open)}} >
                    <CiEdit />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                    <MdDelete />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      <UpdatePostDialog post={post} open={open} setOpen={setOpen}/>
     
    </>
  );
};

export default PostCardHeader;
