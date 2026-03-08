import { AiFillLike } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getPostLikes } from "@/services/interactionServices";
import type { PostType, UserType } from "@/types/postsType";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";

const PostLikesDialog = ({likesCount,post,}: {likesCount: number;post: PostType;}) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [likes, setLikes] = useState<UserType[]>();
  async function handleLikes(postId: string) {
    try {
      setIsLoading(true);
      const response = await getPostLikes(postId);
      setLikes(response?.data?.likes);
      console.log(response?.data?.likes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (isOpen) {
      handleLikes(post._id);
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild onClick={() => handleLikes(post._id)}>
          <button className="flex gap-1 items-center">
            {likesCount} {likesCount <= 1 ? "like" : "likes"}
            <AiFillLike className="text-blue-800" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-blue-100">
          <DialogHeader>
            <DialogTitle>Post likes</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {isLoading ? (
              <>
                <div className="flex justify-center items-center my-5 gap-2">
                  <Spinner /> loading
                </div>
              </>
            ) : (
              <>
                {likes?.map((user: UserType) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between py-2 gap-2"
                  >
                    <div className="flex items-center gap-3 ">
                      <div className="relative">
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="size-10 rounded-full object-cover"
                        />
                        <Badge className="absolute -bottom-1 -right-1 bg-red-200 text-white rounded-full p-1 text-[10px]">
                          ❤
                        </Badge>
                      </div>
                      <span className="font-medium capitalize text-gray-800">
                        {user.name}
                      </span>
                    </div>
                    <span>liked this post</span>
                  </div>
                ))}
              </>
            )}
            {likes?.length === 0 && <p>No Likes for this post</p>}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostLikesDialog;
