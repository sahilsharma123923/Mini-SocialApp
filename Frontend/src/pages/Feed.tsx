import PostCard from "@/components/PostCard"
import { usePostStore } from "@/store/PostStore"
import { useEffect } from "react";



const Feed = () => {
  const {posts,getPosts}=usePostStore();
 
  useEffect(()=>{
  getPosts();
  },[getPosts]);
  return (
    <div className="max-w-xl mx-auto mt-10 px-4 flex flex-col gap-4 font-mono">
     {posts.map((post)=>{
       return <PostCard key={post._id} post={post}/>
      })}
    </div>
  )
}

export default Feed
