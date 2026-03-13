import { useUserDataQuery } from "@/hooks/useUserDataQuery/useUserDataQuery";
import { followAction } from "@/services/interactionServices";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FollowBtn = ({userId , userName }: { userId:string , userName:string}) => {
  const [following, setFollowing] = useState(() => {
    const storedFollowers = localStorage.getItem(`followers-${userId}`);
    return storedFollowers ? JSON.parse(storedFollowers) : false;
  });
  const queryClient = useQueryClient();
  const { userData } = useUserDataQuery();

  const handleFollow = async () => {
    const response = await followAction(userId);
    setFollowing(response.data.following);
    console.log(response);
    const action = response.data.following ? "followed" : "unfollowed";
    toast.success(`${action} ${userName}`);
    queryClient.invalidateQueries({ queryKey: ["getUserData"] });
  };
  useEffect(() => {
    localStorage.setItem(`followers-${userId}`, JSON.stringify(following));
  }, [following,userId]);
  return (
    <>
      {userId == userData?._id ? (
        " "
      ) : (
        <>
          <button
            className={`${following ? "followedBtn" : "followBtn"}`}
            onClick={handleFollow}
          >
            <span className="font-semibold flex items-center gap-1">
              {following ? <> Unfollow</> : "Follow"}
            </span>
          </button>
        </>
      )}
    </>
  );
};

export default FollowBtn;
