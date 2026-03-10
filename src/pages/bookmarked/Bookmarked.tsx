import PostCard from "@/components/Card/PostCard";
import UserInfo from "@/components/userInfo/UserInfo";
import { getAllSavedPosts } from "@/services/interactionServices";
import type { PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";

const Bookmarked = () => {
    const { data } = useQuery({
    queryKey: ["getAllSavedPosts"],
    queryFn: getAllSavedPosts,
    select:(data)=>data?.data.bookmarks
  });
  console.log(data);
  
  return <>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 my-5 p-5 gap-5">
    <div className="col-span-1 bg-blur self-start">
        <UserInfo/>
    </div>
    <div className="col-span-1 md:col-span-2">
            {data?.map((savedPost:PostType)=>(<PostCard post={savedPost}/>))}
    </div>

  </div>
  </>
}

export default Bookmarked
