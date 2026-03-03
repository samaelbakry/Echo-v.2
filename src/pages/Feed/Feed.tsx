import PostCard from "@/components/Card/PostCard";
import CreatePost from "@/components/createPost/CreatePost";
import PostSkeleton from "@/components/postSkeleton/PostSkeleton";
import { getAllPosts } from "@/services/postsServices";
import type { DataType, PostType } from "@/types/postsType";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Feed = () => {
 const { data:post , isLoading } = useQuery<DataType, Error,PostType[]>({
  queryKey:["getAllPosts"],
  queryFn:getAllPosts,
  select:(data)=>data?.data.posts
 })


  return (
    <>
        <div className="mx-auto max-w-7xl h-screen grid grid-cols-1 gap-5 md:grid-cols-8 p-5 my-5">
          <div className="md:col-span-2 col-span-1 bg-blur h-50">
            user data
          </div>
          <div className="md:col-span-4 col-span-1 bg-blur p-2">
            <CreatePost />
            {isLoading ? [...Array(5)].map( ()=> <PostSkeleton />) : <>
            {post?.map((myPost)=> (<React.Fragment key={myPost._id}>
              <PostCard post={myPost}/>
            </React.Fragment>))}
            </>}
          </div>
          <div className="md:col-span-2 col-span-1 bg-blur h-50">
            notifications and follow suggest
          </div>
        </div>

    </>
  );
};

export default Feed;
