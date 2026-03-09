import { getUserData } from "@/services/userServices";
import type { PostType } from "@/types/postsType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "../ui/dropdown-menu";
import {  useState } from "react";
import { deletePost } from "@/services/postsServices";
import { toast } from "react-toastify";
import UpdatePostDialog from "../updatePostDialog/UpdatePostDialog";
import { followAction } from "@/services/interactionServices";
import { Link } from "react-router-dom";


const PostCardHeader = ({ post , friendProfile }: { post: PostType ,  friendProfile?:boolean }) => {

  const [open, setOpen] = useState<boolean>(false);
  const [following, setFollowing] = useState()
  const queryClient =useQueryClient()
 
  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
 
  const handleDelete = async () => {
    await deletePost(post._id)
    toast.success("post deleted Successfully!")
    queryClient.invalidateQueries({queryKey:["getAllPosts"]})
  };
  const handleFollow = async () => {
    const response = await followAction(post.user._id)
    setFollowing(response.data.following)
    console.log(response);
    const action = response.data.following ? "followed" : "unfollowed"
    toast.success(`${action} ${post.user.name}`)
    queryClient.invalidateQueries({queryKey:["getUserData"]})
  };
 
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2 items-center">
          <img
            className="size-10 object-cover rounded-full"
            src={post?.user?.photo}
            alt={post?.user?.name}
          />
          <div className="flex flex-col gap-1">
            <div className="capitalize flex items-center gap-2 text-blue-900 text-sm">
              <Link to={`/profile/${post?.user?._id}`}>
              {post?.user?.name} - @{post?.user?.username} 
              </Link>
              {post?.user?._id == userData?._id  ? " " :<>
               <button className={`${following ? "followedBtn": "followBtn" }`} onClick={handleFollow}>
                 <span className="font-semibold flex items-center gap-1">
                    {following ? (<> Unfollow</>) : "Follow"}
                  </span>
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
          {post?.user?.name === userData?.name && (
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
      {friendProfile ? " " : <UpdatePostDialog post={post} open={open} setOpen={setOpen}/> }
     
    </>
  );
};

export default PostCardHeader;
