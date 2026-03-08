import type { PostType } from "@/types/postsType"

const PostCardBody = ( {post}:{post:PostType} ) => {
  return <>
  <div className='flex flex-col gap-2 items-center justify-center'>
    <div className="font-semibold text-xl h-30 flex items-center">{post?.body}</div>
    {post?.image && <img src={ post.image} alt={post.body} className="object-cover h-90 w-full p-2 rounded-2xl"/>}
  </div>
  </>
}

export default PostCardBody
