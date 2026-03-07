import PostCard from "@/components/Card/PostCard";
import CreatePost from "@/components/createPost/CreatePost"
import PostSkeleton from "@/components/postSkeleton/PostSkeleton";
import UserInfo from "@/components/userInfo/UserInfo"
import { getUserData, getUserPosts } from "@/services/userServices";
import type { PostType } from "@/types/postsType";
import { useQuery} from "@tanstack/react-query";


const UserProfile = () => {
    const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
    const { data: userPost  , isLoading} = useQuery({
    queryKey: ["getUserPosts" , userData?._id],
    queryFn: ()=>getUserPosts(userData!._id),
    enabled:!!userData,
    select: (data) => data?.data?.data?.posts
  });

  


  return<>
   <div className="mx-auto max-w-7xl grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-6 xl:grid-cols-6 p-5 my-5">
          <div className=" col-span-1 md:col-span-2 bg-blur self-start">
            <UserInfo />
          </div>
          <div className="col-span-1 md:col-span-4 bg-blur p-2 my-2">
            <CreatePost/>
            {isLoading ? [...Array(5)].map( ()=> <PostSkeleton />) :<>
            {userPost?.map((userPost:PostType)=>(
                <PostCard key={userPost._id} post={userPost}/>
            ))}
            </> }
            
          </div>
        </div>
  </>
}

export default UserProfile
