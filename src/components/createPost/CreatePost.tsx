import { useQueryClient } from "@tanstack/react-query";
import { TiAttachment } from "react-icons/ti";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import React, { useEffect, useState} from "react";
import { toast } from "react-toastify";
import { Spinner } from "../ui/spinner";
import { createNewPost } from "@/services/postsServices";
import { useUserDataQuery } from "@/hooks/useUserDataQuery/useUserDataQuery";

const CreatePost = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const queryClient =useQueryClient()
    const{ userData} = useUserDataQuery()

  const textAreaControl =React.useRef<HTMLTextAreaElement | null>(null)
  const inputControl = React.useRef<HTMLInputElement | null>(null)

  function chooseFile(){
    const files = inputControl.current?.files
    if(!files || files.length === 0) return
    const selectedFile = files[0]
    setSelectedImage(selectedFile)  
  }
   function openFile(){
    inputControl.current?.click()
  }

  async function createPostFeed() {
    const formData= new FormData()
    if(textAreaControl.current?.value){
      formData.append("body",textAreaControl.current.value)
    }
    if(selectedImage){
      formData.append("image",selectedImage)
    }
    setIsLoading(true)
    try {
        await createNewPost(formData)
       toast.success('Your post was published')
      setOpen(false)
      queryClient.invalidateQueries({queryKey:["getAllPosts"]})
      setSelectedImage(null)
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
      
    }
  }

  useEffect(() => {
    if(!selectedImage){
      setPreview(null)
      return
    }
    const imageUrl = URL.createObjectURL(selectedImage)
    setPreview(imageUrl)
  
  }, [selectedImage])
  

  return (
    <>
      <div className="bg-blue-50/70 dark:bg-slate-500 shadow rounded-xl p-4 flex items-center justify-between flex-wrap gap-2">
        <div className="space-x-2 flex items-center ">
          <img src={userData?.photo} alt={userData?.name} className="size-9 rounded-full object-cover"/>
          <div>
            <span className="dark:text-white/80">{userData?.name} , </span>
            <span className="dark:text-white/80">what's happening?</span>
          </div>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer" onClick={() => setOpen(true)}>
              <span className="bg-blur dark:bg-slate-400 p-2 cursor-pointer rounded-2xl font-bold">
                + Create Post
              </span>
            </DialogTrigger>
            <DialogContent className="md:max-w-2xl bg-blue-100 dark:bg-slate-500">
              <DialogHeader>
                <DialogTitle className="dark:text-white/80">Create Post
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex gap-2 items-center">
                      <img className="size-10 object-cover rounded-full"src={userData?.photo}alt={userData?.name} />
                      <div className="flex flex-col gap-1">
                        <span className="capitalize font-semibold dark:text-white/80">
                          {userData?.name} - @{userData?.username}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Textarea className={`max-w-3xl ${preview ? "" : "min-h-40 border-0 placeholder:text-gray-900 dark:text-white"}`} ref={textAreaControl} placeholder="Got something to say ?...." />
                   {preview && <img src={preview} className="size-fit object-cover"  alt="post-image"/> }
                  <div className="flex my-4 items-center gap-3 justify-end">
                    <input type="file" onChange={chooseFile} className="hidden" ref={inputControl} />
                    <TiAttachment  onClick={openFile} className="text-3xl text-blue-800"/>
                    <Button variant={"outline"} className="cursor-pointer" onClick={createPostFeed}>{isLoading ? <Spinner /> : "share your post"}</Button>
                    <Button variant={"outline"} onClick={() => setOpen(false)}>Cancel</Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
