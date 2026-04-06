import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserCheck, FaUserFriends } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { uploadNewProfilePhoto } from "@/services/interactionServices";
import fallBackImg from "../../assets/download (2).jpg";
import { IoCameraOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useUserDataQuery } from "@/hooks/useUserDataQuery/useUserDataQuery";
import { RiUserFollowLine } from "react-icons/ri";

const UserInfo = () => {
  const [changePhoto, setChangePhoto] = useState<File | null>(null);
  const { userData } = useUserDataQuery();

  const inputControl = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const { mutate: changeProfilePhoto } = useMutation({
    mutationFn: uploadNewProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserData"] });
    },
  });

  function openFile() {
    inputControl.current?.click();
  }
  function chooseFile() {
    const files = inputControl.current?.files;
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    setChangePhoto(selectedFile);
  }

  async function changeProfilePhotoHandler() {
    if (!changePhoto) return;
    const formData = new FormData();
    formData.append("photo", changePhoto);
    changeProfilePhoto(formData);
  }
  useEffect(() => {
    if (changePhoto) {
      changeProfilePhotoHandler();
    }
  }, [changePhoto]);

  const createdAt = userData?.createdAt ? new Date(userData.createdAt) : null;
  const expirationDate = createdAt ? new Date(createdAt) : null;

  if (expirationDate && createdAt) {
    expirationDate.setDate(createdAt.getDate() + 7);
  }

  const today = new Date();
  const differTime = expirationDate
    ? expirationDate.getTime() - today.getTime()
    : 0;

  const daysLeft = Math.ceil(differTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
        <div className="h-28 relative">
          <img
            src={userData?.cover || fallBackImg}
            alt="cover"
            className="w-full h-full object-cover"
          />

          <div className="absolute -bottom-10 left-4 flex items-center gap-2">
            <img
              src={
                changePhoto ? URL.createObjectURL(changePhoto) : userData?.photo
              }
              alt={userData?.name}
              className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow"
            />
            <button
              onClick={openFile}
              className="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition"
            >
              <IoCameraOutline />
            </button>

            <input
              onChange={chooseFile}
              ref={inputControl}
              type="file"
              className="hidden"
            />
          </div>
        </div>

        <div className="pt-12 px-4 pb-4 flex flex-col gap-3">
          <Link to={"/userProfile"}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition">
              {userData?.name}
            </h2>
          </Link>
          <span className="text-sm text-gray-500">@{userData?.username}</span>

          <div className="grid grid-cols-2 gap-y-2 text-sm mt-1">
            <span className="text-gray-400">Email</span>
            <span className="text-gray-700 dark:text-gray-200 truncate">
              {userData?.email}
            </span>

            <span className="text-gray-400">Gender</span>
            <span className="text-gray-700 dark:text-gray-200">
              {userData?.gender || "—"}
            </span>

            <span className="text-gray-400">Birth</span>
            <span className="text-gray-700 dark:text-gray-200">
              {userData?.dateOfBirth
                ? new Date(userData.dateOfBirth).toLocaleDateString()
                : "—"}
            </span>
          </div>
          <div
            className={`p-3 rounded-xl flex justify-between items-center text-xs mt-2
      ${
        daysLeft <= 2
          ? "bg-red-50 text-red-600"
          : daysLeft <= 5
            ? "bg-yellow-50 text-yellow-700"
            : "bg-green-50 text-green-700"
      }`}
          >
            <span>
              ⚠️ Expires in {daysLeft} day{daysLeft !== 1 && "s"}
            </span>

            <span className="opacity-70">
              {expirationDate?.toLocaleDateString()}
            </span>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            <Link
              to={"/followedUsers"}
              className="flex items-center gap-2 bg-orange-50 p-3 rounded-xl hover:scale-105 transition"
            >
              <RiUserFollowLine className="text-orange-600" />
              Following feed
            </Link>

            <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-xl">
              <FaUserCheck className="text-blue-600" />
              <span className="font-medium">{userData?.followersCount}</span>
              Followers
            </div>

            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-xl">
              <FaUserFriends className="text-green-600" />
              <span className="font-medium">{userData?.followingCount}</span>
              Following
            </div>

            <Link
              to={"/bookmarkedPosts"}
              className="flex items-center gap-2 bg-purple-50 p-3 rounded-xl hover:scale-105 transition"
            >
              <FaBookmark className="text-purple-600" />
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
