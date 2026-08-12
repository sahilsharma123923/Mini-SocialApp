import { Heart, MessageCircle, Trash } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import type { Post } from "@/types/Posts";
import { usePostStore } from "@/store/PostStore";
import CommentSection from "./CommentSection";
import { useState } from "react";
import { Button } from "./ui/button";

interface PostProps {
    post : Post
}

const PostCard = ({post}:PostProps) => {
    const toggleLike=usePostStore((state)=>state.toggleLiked);
    const deletePost=usePostStore((state)=>state.deletePost)

    const [showComments,setShowComments]=useState(false)
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 bg-background">

   {/* Header Part */}
 <div className="flex items-center justify-between">

  {/* User */}
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarFallback>{post.avatar}</AvatarFallback>
    </Avatar>

    <div className="flex flex-col">
       <span className="text-sm font-semibold">
         {post.username}
       </span>

       <span className="text-xs text-muted-foreground">
         {post.createdAt}
       </span>
     </div>
   </div>

  {/* Delete */}
  <Button
    variant="ghost"
    onClick={() => deletePost(post.id)}
  >
    <Trash className="w-4 h-4" />
  </Button>

</div>
       {/* Body part */}
       <div>
        <p>{post.content}</p>
        {post.image && (
            <img src={post.image} alt="Post-content"
            className="w-full rounded-lg object-cover" />
        )}
       </div>

       {/* Footer */}
        <div className="flex items-center gap-6 border-t pt-3">

        {/* Like */}
        <Button
          variant="ghost"
          onClick={() => toggleLike(post.id)}
          className={`flex items-center gap-1.5 text-sm cursor-pointer ${
            post.isLiked
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500"
          }`}
        >
          <Heart
            className="size-4"
            fill={post.isLiked ? "currentColor" : "none"}
          />

          <span>{post.likes}</span>
        </Button>

        {/* Comment */}
        <Button
          variant="ghost"
          onClick={()=>setShowComments(!showComments)}

          className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer"
        >
          <MessageCircle className="size-4" />
          <span>{post.comments}</span>
        </Button>

      </div>
      {showComments && (
        <div>
          <CommentSection postId={post.id}/>

          <Button
          variant="ghost"
          onClick={()=>setShowComments(false)}
           className="mt-2">
            Close
          </Button>
        </div>
      
      )}
    </div>
  )
}

export default PostCard
