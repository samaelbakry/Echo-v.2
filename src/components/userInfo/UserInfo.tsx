import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserCheck, FaUserFriends } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { uploadNewProfilePhoto } from "@/services/interactionServices";
import fallBackImg from "../../assets/download (2).jpg"
import { IoCameraOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useUserDataQuery } from "@/hooks/useUserDataQuery/useUserDataQuery";
import { RiUserFollowLine } from "react-icons/ri";


const UserInfo = () => {

  const [changePhoto, setChangePhoto] = useState<File | null>(null)
  const {userData} = useUserDataQuery()
  
  const inputControl = React.useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()

  const { mutate: changeProfilePhoto } = useMutation({
  mutationFn: uploadNewProfilePhoto,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["getUserData"] })
  }
})

  function openFile(){
    inputControl.current?.click()
  }
    function chooseFile(){
    const files = inputControl.current?.files
     if(!files || files.length === 0) return
    const selectedFile = files[0]
    setChangePhoto(selectedFile)
  }

async function changeProfilePhotoHandler() {
  if (!changePhoto) return
  const formData = new FormData()
  formData.append("photo", changePhoto)
  changeProfilePhoto(formData)
}
    useEffect(() => {
    if(changePhoto){
        changeProfilePhotoHandler()
    }
  }, [changePhoto])
 
 
  return (
    <>
      <div className="my-1 p-1">
        <div className="h-24 rounded-md relative">
         <img src={userData?.cover || fallBackImg } alt="cover" className="w-full h-full object-cover rounded-md"/>
          <img src={changePhoto ? URL.createObjectURL(changePhoto) : userData?.photo}alt={userData?.name}className="bg-blur w-16 h-16 md:w-24 md:h-24 object-cover rounded-full absolute -bottom-8 left-4" />
          <span className="absolute -bottom-5 left-25 bg-blue-200 text-blue-500 rounded-2xl block size-7 p-1 hover:bg-blue-800 hover:text-white cursor-pointer duration-500">
            <IoCameraOutline onClick={openFile} className="text-xl" />
            <input onChange={chooseFile} ref={inputControl} type="file" className="hidden" />
          </span>
        </div>
        <div className="mt-12 px-4 flex flex-col gap-1">
            <Link to={"/userProfile"}>
             <h2 className="text-lg font-semibold dark:text-white/80 dark:hover:text-blue-800 duration-500 hover:text-blue-800">{userData?.name}</h2>
            </Link>
          <span className="text-sm text-gray-500 dark:text-white/80">@{userData?.username}</span>
          <span className="text-sm text-gray-600 dark:text-white/80">{userData?.email}</span>
          <span className="text-sm text-gray-600 dark:text-white/80">
            Gender: {userData?.gender}
          </span>
          <span className="text-sm text-gray-600 dark:text-white/80">
            Birth date: {new Date(userData?.dateOfBirth).toLocaleDateString()}
          </span>
         
          <div className="flex flex-col gap-3 mt-3 text-sm">
             <Link to={"/followedUsers"} className="flex items-center gap-2 bg-orange-50 p-2 rounded-xl">
              <span className="bg-orange-200 p-1 rounded-lg">
                <RiUserFollowLine className="text-base text-orange-700" />
              </span>
              <span className="font-medium"></span>
              Following feed
            </Link>
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
            <Link to={"/bookmarkedPosts"} className="flex items-center gap-2 bg-purple-50 p-2 rounded-xl">
              <span className="bg-purple-200 p-1 rounded-lg">
                <FaBookmark className="text-base text-purple-700" />
              </span>
              <span className="font-medium">{userData?.bookmarksCount}</span>
              Bookmarks
            </Link>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default UserInfo;
