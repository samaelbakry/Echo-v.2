import PostCard from "@/components/Card/PostCard";
import PostSkeleton from "@/components/postSkeleton/PostSkeleton";
import { getSinglePostId } from "@/services/postsServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const NotificationsData = () => {
  const { postId } = useParams();
  console.log(postId);
  const { data: post, isLoading } = useQuery({
    queryKey: ["getSinglePostId", postId],
    queryFn: () => getSinglePostId(postId!),
    select: (post) => post?.data?.post,
  });
  console.log(post);

  return (
    <>
      <div className="mx-auto max-w-6xl grid grid-cols-1 p-5 my-5">
        <div className="col-span-1 dark:bg-slate-700 dark:border-slate-700 dark:shadow-slate-800  rounded-2xl p-5">
          {isLoading ? (
            [...Array(1)].map(() => <PostSkeleton />)
          ) : (
            <>
              <PostCard post={post} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsData;
