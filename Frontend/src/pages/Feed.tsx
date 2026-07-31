import type { Post } from "@/types/Posts";
import PostCard from "@/components/PostCard"

interface FeedProps{
  posts:Post[];
}

const Feed = ({posts}:FeedProps) => {
 

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 flex flex-col gap-4 font-mono">
     {posts.map((post)=>{
       return <PostCard key={post.id} post={post}/>
      })};
    </div>
  );
}

export default Feed
