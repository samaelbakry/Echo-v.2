import type { PostType } from "@/types/postsType"
import CardBody from "./PostCardBody"
import CardFooter from "./PostCardFooter"
import CardHeader from "./PostCardHeader"

const PostCard = ( {post}:{post:PostType} ) => {
  return <>
  <div className="bg-blue-50/70 shadow rounded-xl my-5 px-2 p-3">
  <CardHeader post={post} friendProfile/>
  <CardBody post={post}/>
  <CardFooter post={post}/>
  </div>
  </>
}

export default PostCard
