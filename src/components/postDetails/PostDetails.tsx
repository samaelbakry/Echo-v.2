import { getSinglePostId } from "@/services/postsServices";
import type { PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import PostCardHeader from "../Card/PostCardHeader";
import PostCardBody from "../Card/PostCardBody";
import Comments from "../comments/Comments";

const PostDetails = ({ post }: { post: PostType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["getSinglePost", post._id],
    queryFn: () => getSinglePostId(post._id),
    enabled: isOpen,
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="cursor-pointer">view</DialogTrigger>
        <DialogContent className="md:max-w-xl bg-blue-100">
          <DialogHeader>
            <DialogTitle>
              <PostCardHeader post={post} />
            </DialogTitle>
            <DialogDescription>
              <PostCardBody post={post}/>
              <Comments post={post}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDetails;
