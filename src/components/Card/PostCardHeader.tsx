import type { PostType } from "@/types/postsType";
import { useQueryClient } from "@tanstack/react-query";
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
import { useState } from "react";
import { deletePost } from "@/services/postsServices";
import { toast } from "react-toastify";
import UpdatePostDialog from "../updatePostDialog/UpdatePostDialog";
import { Link } from "react-router-dom";
import { useUserDataQuery } from "@/hooks/useUserDataQuery/useUserDataQuery";
import FollowBtn from "../followBtn/FollowBtn";

const PostCardHeader = ({ post }: { post: PostType }) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { userData } = useUserDataQuery();

  const handleDelete = async () => {
    await deletePost(post._id);
    toast.success("post deleted Successfully!");
    queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
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
            <div className="capitalize flex items-center gap-2 text-blue-900 text-sm dark:text-blue-900 font-bold">
              <Link to={`/profile/${post?.user?._id}`}>
                {post?.user?.name} - @{post?.user?.username}
              </Link>
              <FollowBtn userId={post.user._id} userName={post.user.name} />
            </div>
            <span className="text-sm dark:text-white/80">
              {new Date(post.createdAt).toLocaleString("en-us", {
                timeStyle: "short",
                dateStyle: "medium",
              })}
            </span>
          </div>
        </div>
        <div className="px-3">
          {post?.user?._id === userData?._id && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <HiDotsHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpen(true);
                    }}
                    
                  >
                    <CiEdit />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    <MdDelete />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      <UpdatePostDialog post={post} open={open} setOpen={setOpen} />
    </>
  );
};

export default PostCardHeader;
