import type { PostType } from "@/types/postsType"

const PostCardHeader = ({post}:{post:PostType}) => {
  return <>
  <div className="flex items-center justify-between p-4">
    <div className="flex gap-2 items-center">
      <img className="size-10 object-cover rounded-full" src={post.user.photo} alt={post.user.name}/>
      <div className="flex flex-col gap-1">
      <span className="capitalize text-blue-900">{post.user.name} - @{post.user.username}</span>
      <span>{new Date(post.createdAt).toLocaleString("en-us", { timeStyle: "short", dateStyle: "medium",})}</span>
    </div> 

    </div>
  </div>
  </>
}

export default PostCardHeader
