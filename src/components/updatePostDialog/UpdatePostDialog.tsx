import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "@/services/userServices";
import { useRef, useState } from "react";
import type { PostType } from "@/types/postsType";
import { updatePost } from "@/services/postsServices";
import { toast } from "react-toastify";
import { TiAttachment } from "react-icons/ti";
import { Spinner } from "../ui/spinner";

const UpdatePostDialog = ({ post ,open , setOpen  }: { post: PostType , open: boolean , setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const [editPostImage, setEditPostImage] = useState<File | string | null>(post.image || null,);
  const attachPostImage = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState(post.body);
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient();

  function makeInputOpen() {
    attachPostImage.current?.click();
  }

  function chooseFile() {
    const file = attachPostImage.current?.files?.[0] || null;
    setEditPostImage(file);
  }

  const handleEdit = async () => {
    const formData = new FormData();
    if (text) {
      formData.append("body", text);
    }
    if (editPostImage) {
      formData.append("image", editPostImage);
    }
    try {
     setIsLoading(true)
     const response = await updatePost(post._id, formData);
    toast.success("post updated Successfully!");
    queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    setOpen(false);
    } catch (error) {
        console.log(error);
    }finally{
        setIsLoading(false)
    }
    
  };

  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-2xl bg-blue-100">
          <DialogHeader>
            <DialogTitle>Edit your Post</DialogTitle>
            <div className="my-2 flex items-center gap-1">
              <img
                src={userData.photo}
                alt="userImage"
                className="size-8 rounded-2xl"
              />
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
                <input
                  ref={attachPostImage}
                  onChange={chooseFile}
                  type="file"
                  className="hidden"
                />
                <TiAttachment onClick={makeInputOpen} className="text-3xl" />
                <Button onClick={handleEdit}>{isLoading ? <Spinner /> : "Update"}</Button>
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

export default UpdatePostDialog;
