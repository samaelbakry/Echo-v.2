import type { PostType } from "@/types/postsType"

const PostCardBody = ( {post}:{post:PostType} ) => {
  return <>
  <div className='flex flex-col gap-2 items-center justify-center'>
    <div className="font-semibold text-xl">{post.body}</div>
    {post.image && <img src={ post.image} alt={post.body} className="object-cover w-full p-2 rounded-2xl"/>}
  </div>
  </>
}

export default PostCardBody
