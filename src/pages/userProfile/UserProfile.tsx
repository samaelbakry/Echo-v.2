import PostCard from "@/components/Card/PostCard";
import CreatePost from "@/components/createPost/CreatePost";
import PostSkeleton from "@/components/postSkeleton/PostSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserInfo from "@/components/userInfo/UserInfo";
import { changeUserPassword } from "@/services/authServices";
import { getUserData, getUserPosts } from "@/services/userServices";
import type { PostType } from "@/types/postsType";
import { useQuery, useQueryClient} from "@tanstack/react-query";
import { useRef, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate()
  const queryClient =useQueryClient()
  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
  const { data: userPost, isLoading } = useQuery({
    queryKey: ["getUserPosts", userData?._id],
    queryFn: () => getUserPosts(userData!._id),
    enabled: !!userData,
    select: (data) => data?.data?.data?.posts,
  });
  const [openSettings, setOpenSettings] = useState(false);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const newPasswordInput = useRef<HTMLInputElement | null>(null);

  async function handleChangePassword() {
    const PasswordObj = {
      password: passwordInput.current?.value,
      newPassword: newPasswordInput.current?.value,
    };
    try {
      const response = await changeUserPassword(PasswordObj)
      console.log(response);
      navigate("/login")
      toast.success("You have to login again")
      queryClient.invalidateQueries({queryKey:["getUserData"]})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-6 xl:grid-cols-6 p-5 my-5">
        <div className="col-span-1 md:col-span-2 bg-blur self-start">
          <UserInfo />
          <div className="p-3 m-3">
            <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => setOpenSettings((open) => !open)}>
              <span>change your password ? </span>
              <IoSettingsSharp />
            </div>
            {openSettings && (
              <>
                 <Input
                  ref={passwordInput}
                  className="flex-1 rounded-xl border-gray-300 shadow mb-2"
                  placeholder="Password"
                />
                <Input
                  ref={newPasswordInput}
                  className="flex-1 rounded-xl border-gray-300 shadow mb-2"
                  placeholder="New password"
                />
                <Button className="w-fit mx-2 bg-blue-900 mt-2" onClick={handleChangePassword}>Change</Button>
              </>
            )}
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 bg-blur p-2 my-2">
          <CreatePost />
          {isLoading ? (
            [...Array(5)].map(() => <PostSkeleton />)
          ) : (
            <>
              {userPost?.map((userPost: PostType) => (
                <PostCard key={userPost._id} post={userPost} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
