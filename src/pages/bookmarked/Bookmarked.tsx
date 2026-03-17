import PostCard from "@/components/Card/PostCard";
import UserInfo from "@/components/userInfo/UserInfo";
import { getAllSavedPosts } from "@/services/interactionServices";
import type { PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const Bookmarked = () => {
  const { data } = useQuery({
    queryKey: ["getAllSavedPosts"],
    queryFn: getAllSavedPosts,
    select: (data) => data?.data.bookmarks,
  });

  return (
    <>
      <Helmet>
        <title>Bookmark Page </title>
      </Helmet>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 my-5 p-5 gap-5">
        <div className="col-span-1 bg-blur self-start">
          <UserInfo />
        </div>
        <div className="col-span-1 md:col-span-2">
          {data?.length === 0 && (
            <p className="bg-blur py-5 text-center dark:text-white/80">
              You haven't saved any posts yet. Start bookmarking posts to see
              them here
            </p>
          )}
          {data?.map((savedPost: PostType) => (
            <PostCard post={savedPost} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookmarked;
