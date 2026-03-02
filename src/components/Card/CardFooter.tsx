import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";


const CardFooter = () => {
  return <>
  <div className="flex items-center justify-between p-5">
    <span className="flex items-center gap-2">
        likes count
        <AiFillLike />
    </span>
    <span className="flex items-center gap-2">
        comments count
        <AiOutlineComment />
    </span>
  </div>
  <div className="flex items-center justify-between p-3">
    <div className="flex items-center gap-2 reactionsBtn ">
        like
        <AiFillLike />
    </div>
    <div className="flex items-center gap-2 reactionsBtn">
        comment
        <AiOutlineComment />
    </div>
    <div className="flex items-center gap-2 reactionsBtn">
        share
        <FaShare />
    </div>
  </div>
  </>
}

export default CardFooter
