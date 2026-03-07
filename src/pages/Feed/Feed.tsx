import PostCard from "@/components/Card/PostCard";
import CreatePost from "@/components/createPost/CreatePost";
import Notifications from "@/components/notifications/Notifications";
import PostSkeleton from "@/components/postSkeleton/PostSkeleton";
import UserInfo from "@/components/userInfo/UserInfo";
import { getAllPosts } from "@/services/postsServices";
import type { DataType, PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Feed = () => {

 const { data:post , isLoading } = useQuery<DataType, Error,PostType[]>({
  
  queryKey:["getAllPosts"],
  queryFn:getAllPosts,
  select:(data)=>data?.data.posts,
 })



  return (
    <>
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-8 xl:grid-cols-8 p-5 my-5">
          <div className=" col-span-1 md:col-span-2 bg-blur self-start order-1">
            <UserInfo/>
          </div>
          <div className="col-span-1 md:col-span-4 bg-blur p-2 order-3 md:order-2">
            <CreatePost  />
            {isLoading ? [...Array(5)].map( ()=> <PostSkeleton />) :
             <React.Fragment >
            {post?.map((myPost)=> (
            <React.Fragment key={myPost._id}>
              <PostCard post={myPost}/>
            </React.Fragment>))}
            </React.Fragment>}
          </div>
          <div className="col-span-1 md:col-span-2 bg-blur self-start p-4 order-2 md:order-3">
            <Notifications />
          </div>
        </div>

    </>
  );
};

export default Feed;
