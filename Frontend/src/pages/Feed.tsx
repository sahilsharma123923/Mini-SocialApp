import PostCard from "@/components/PostCard"
import { usePostStore } from "@/store/PostStore"



const Feed = () => {
  const posts=usePostStore((state)=>state.posts)
 
  return (
    <div className="max-w-xl mx-auto mt-10 px-4 flex flex-col gap-4 font-mono">
     {posts.map((post)=>{
       return <PostCard key={post.id} post={post}/>
      })}
    </div>
  )
}

export default Feed
