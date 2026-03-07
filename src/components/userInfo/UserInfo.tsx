import { getUserData } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";
import { FaUserCheck, FaUserFriends } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const UserInfo = () => {
    const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
 
  return (
    <>
      <div className="my-1 p-1">
        <div className="bg-amber-200 h-24 rounded-md relative">
          <span className="text-sm text-gray-600 absolute top-2 left-2">
            cover photo
          </span>
          <img
            src={userData?.photo}
            alt={userData?.name}
            className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full bg-blur absolute -bottom-8 left-4"
          />
        </div>
        <div className="mt-12 px-4 flex flex-col gap-1">
            <Link to={"/userProfile"} className="cursor-pointer hover:text-blue-800 duration-500">
             <h2 className="text-lg font-semibold">{userData?.name}</h2>
            </Link>
          <span className="text-sm text-gray-500">@{userData?.username}</span>

          <span className="text-sm text-gray-600">{userData?.email}</span>

          <span className="text-sm text-gray-600">
            Gender: {userData?.gender}
          </span>

          <span className="text-sm text-gray-600">
            Birth date: {new Date(userData?.dateOfBirth).toLocaleDateString()}
          </span>

          <div className="flex flex-col gap-3 mt-3 text-sm">
            <span className="flex items-center gap-2 bg-blue-50 p-2 rounded-xl">
              <span className="bg-blue-200 p-1 rounded-lg">
                <FaUserCheck className="text-base text-blue-700" />
              </span>
              <span className="font-medium">{userData?.followersCount}</span>
              Followers
            </span>

            <span className="flex items-center gap-2 bg-green-50 p-2 rounded-xl">
              <span className="bg-green-200 p-1 rounded-lg">
                <FaUserFriends className="text-base text-green-700" />
              </span>
              <span className="font-medium">{userData?.followingCount}</span>
              Following
            </span>

            <span className="flex items-center gap-2 bg-purple-50 p-2 rounded-xl">
              <span className="bg-purple-200 p-1 rounded-lg">
                <FaBookmark className="text-base text-purple-700" />
              </span>
              <span className="font-medium">{userData?.bookmarksCount}</span>
              Bookmarks
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
