import type { PostType } from "@/types/postsType"

const PostCardBody = ( {post}:{post:PostType} ) => {
  return <>
   <div className='flex flex-col gap-2 items-center justify-center'>
    {post?.body && (
  <div className="font-semibold text-lg my-3 text-gray-800 dark:text-white/80">
    {post.body}
  </div>
)}

   {post?.sharedPost?.body && (
  <div className="border border-gray-300 rounded-xl p-3 mx-5 w-full">
    <div className="flex items-center gap-2 mb-2">
      <img className="size-9 rounded-full object-cover"src={post?.sharedPost?.user.photo} alt={post?.sharedPost?.user.name}
      />
      <div className="flex flex-col gap-1 text-sm capitalize">
        <span>{post?.sharedPost?.user.name} - @{post?.sharedPost?.user.username}</span>
        <span className="text-sm">{new Date(post.createdAt).toLocaleString("en-us", {timeStyle: "short",dateStyle: "medium",})}</span>
      </div>
    </div>
    <p className="text-gray-800 text-sm my-5 text-center">
      {post?.sharedPost?.body}
    </p>
    {post?.sharedPost?.image && (
      <img
        className="w-full max-h-80 object-cover rounded-lg"
        src={post?.sharedPost?.image}
        alt="shared post"
      />
    )}

  </div>
)}
    {post?.image && <img src={ post.image} alt={post.body} className="object-cover h-90 w-full p-2 rounded-2xl"/>}
  </div>
  </> 
}

export default PostCardBody
