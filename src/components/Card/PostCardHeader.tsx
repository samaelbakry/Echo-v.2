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
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { deletePost, updatePost } from "@/services/postsServices";
import { TiAttachment } from "react-icons/ti";
import { toast } from "react-toastify";

const PostCardHeader = ({ post }: { post: PostType }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState(post.body);
  const [editPostImage, setEditPostImage] = useState<File | string | null>(post.image || null, );
  const queryClient =useQueryClient()
  const attachPostImage = useRef<HTMLInputElement | null>(null);

  function makeInputOpen(){
    attachPostImage.current?.click()
  }
  function chooseFile(){
    const file = attachPostImage.current?.files?.[0] || null
    setEditPostImage(file)
  }
  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });

  const handleEdit = async () => {
    const formData= new FormData()
    if(text){
      formData.append("body",text)
    }
    if(editPostImage){
      formData.append("image",editPostImage)
    }
    const response =await updatePost(post._id , formData)
    toast.success("post updated Successfully!")
    queryClient.invalidateQueries({queryKey:["getAllPosts"]})
    setOpen(false);
  };

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
            <span className="capitalize text-blue-900 text-sm">
              {post.user.name} - @{post.user.username}
            </span>
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
                    onClick={() => {setOpen(true); }} >
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-2xl bg-blue-100">
          <DialogHeader>
            <DialogTitle>Edit your Post</DialogTitle>
            <div className="my-2 flex items-center gap-1">
              <img src={userData.photo} alt="userImage" className="size-8 rounded-2xl" />
              <div className="flex flex-col">
                <span>{userData.name}</span>
                <span>{userData.username}</span>
              </div>
            </div>
            <DialogDescription>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`${editPostImage ? "min-h-10" : " min-h-40 w-full"}`}
              />
              {editPostImage && (
                <img
                  src={
                    typeof editPostImage === "string"
                      ? editPostImage
                      : URL.createObjectURL(editPostImage)
                  }
                  alt="post"
                  className="w-full mt-2 object-cover rounded"
                />
              )}
              <div className="flex justify-end mt-4 gap-2">
                <input ref={attachPostImage} onChange={chooseFile} type="file" className="hidden"/>
                  <TiAttachment onClick={makeInputOpen} className="text-3xl" />
                <Button onClick={handleEdit}>Save</Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCardHeader;
