import PostCard from "@/components/Card/PostCard";
import PostSkeleton from "@/components/postSkeleton/PostSkeleton";
import { getFriendsPosts, getFriendsProfile } from "@/services/userServices";
import type { PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";
import { FaUserFriends } from "react-icons/fa";
import { FaBookmark, FaUserCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import fallBackImg from "../../assets/download (2).jpg"

const FriendProfile = () => {
  const { userProfileId } = useParams();

  const { data:friendData } = useQuery({
    queryKey: ["getFriendData"],
    queryFn: () => getFriendsProfile(userProfileId!),
    enabled: !!userProfileId,
    select:(data)=>data?.data?.data?.user
  });
    console.log(friendData , "d");

  const { data: friendPosts , isLoading } = useQuery({
    queryKey: ["getFriendPosts"],
    queryFn: () => getFriendsPosts(userProfileId!),
    enabled: !!userProfileId,
    select:(data)=>data?.data?.data?.posts
  });
  console.log(friendPosts , "posts");
  


  return <>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 my-5 p-5 gap-5">
        <div className="my-1 p-2 col-span-1 bg-blur self-start">
        <div className="h-24 rounded-md relative ">
         <img src={friendData?.cover || fallBackImg} alt="cover" className="w-full h-full object-cover rounded-md"/>
          <img
            src={friendData?.photo}
            alt={friendData?.name}
            className="bg-blur w-16 h-16 md:w-24 md:h-24 object-cover rounded-full absolute -bottom-8 left-4"
          />
        </div>
        <div className="mt-12 px-4 flex flex-col gap-1">
             <h2 className="text-lg font-semibold">{friendData?.name}</h2>
          <span className="text-sm text-gray-500">@{friendData?.username}</span>

          <span className="text-sm text-gray-600">{friendData?.email}</span>

          <span className="text-sm text-gray-600">
            Gender: {friendData?.gender}
          </span>

          <span className="text-sm text-gray-600">
            Birth date: {new Date(friendData?.dateOfBirth).toLocaleDateString()}
          </span>

          <div className="flex flex-col gap-3 mt-3 text-sm">
            <span className="flex items-center gap-2 bg-blue-50 p-2 rounded-xl">
              <span className="bg-blue-200 p-1 rounded-lg">
                <FaUserCheck className="text-base text-blue-700" />
              </span>
              <span className="font-medium">{friendData?.followersCount}</span>
              Followers
            </span>

            <span className="flex items-center gap-2 bg-green-50 p-2 rounded-xl">
              <span className="bg-green-200 p-1 rounded-lg">
                <FaUserFriends className="text-base text-green-700" />
              </span>
              <span className="font-medium">{friendData?.followingCount}</span>
              Following
            </span>

            <span className="flex items-center gap-2 bg-purple-50 p-2 rounded-xl">
              <span className="bg-purple-200 p-1 rounded-lg">
                <FaBookmark className="text-base text-purple-700" />
              </span>
              <span className="font-medium">{friendData?.bookmarksCount}</span>
              Bookmarks
            </span>
          </div>
        </div>
      </div>
       <div className="col-span-1 md:col-span-2 bg-blur p-2 my-2">
            {isLoading ? [...Array(5)].map( ()=> <PostSkeleton />) :<>
            {friendPosts?.map((friendPost:PostType)=>(
                <PostCard key={friendPost._id} post={friendPost} friendProfile/>
            ))}
            </> }
          </div>
  </div>
  </>;
};

export default FriendProfile;
