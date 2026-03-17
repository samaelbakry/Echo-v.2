import { sharePost } from "@/services/interactionServices";
import type { PostType } from "@/types/postsType";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "react-toastify";
import { FaShare } from "react-icons/fa6";

const SharePostDialog = ({ post }: { post: PostType }) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shareText, setShareText] = useState("");
  const queryClient = useQueryClient();

  async function handleShare(postId: string, shareText: string) {
    try {
      setIsLoading(true);
      const response = await sharePost(postId, shareText);
      console.log(response);
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="flex w-full items-center justify-center gap-2 reactionsBtn group">
            <FaShare className="text-base transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:inline font-medium">Share</span>
          </button>
        </DialogTrigger>
        <DialogContent className="bg-blue-100 dark:bg-slate-500 dark:text-white/80">
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
          </DialogHeader>
          <textarea
            placeholder="Write something..."
            className="w-full border p-2 rounded-md dark:placeholder:text-slate-900"
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
          />
          <Button
            className="rounded-md mt-3"
            onClick={() => handleShare(post._id, shareText)}
          >
            {isLoading ? <Spinner /> : "Share post"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SharePostDialog;
