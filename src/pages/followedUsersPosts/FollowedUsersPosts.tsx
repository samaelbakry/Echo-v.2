import PostCard from "@/components/Card/PostCard";
import PostSkeleton from "@/components/postSkeleton/PostSkeleton";
import UserInfo from "@/components/userInfo/UserInfo"
import { getFollowedUsersPosts } from "@/services/postsServices";
import type { PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";

const FollowedUsersPosts = () => {
    const { data  ,isLoading } = useQuery({
    queryKey: ["getFollowedUsersPosts"],
    queryFn: getFollowedUsersPosts,
    select:(data)=>data?.data?.posts
  });

  return <>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 my-5 p-5 gap-5">
    <div className="col-span-1 bg-blur self-start">
        <UserInfo/>
    </div>
    <div className="col-span-1 md:col-span-2">
      {data?.length === 0 && <p className="bg-blur py-5 text-center dark:text-white/80"> Follow users to see their posts here</p>}
      {isLoading ? [...Array(5)].map(() => <PostSkeleton />) : data?.map((Post:PostType)=>(<PostCard post={Post}/>))}
    </div>

  </div>
  </>
}

export default FollowedUsersPosts
