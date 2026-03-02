import Card from "@/components/Card/Card";
import CreatePost from "@/components/createPost/CreatePost";

const Feed = () => {
  return (
    <>
    
        <div className="mx-auto max-w-7xl h-screen grid grid-cols-1 gap-5 md:grid-cols-8 p-5 my-5">
          <div className="md:col-span-2 col-span-1 bg-blur h-50">
            user data
          </div>
          <div className="md:col-span-4 col-span-1 bg-blur p-2">
            <CreatePost />
            <Card/>
          </div>
          <div className="md:col-span-2 col-span-1 bg-blur h-50">
            notifications and follow suggest
          </div>
        </div>

    </>
  );
};

export default Feed;
