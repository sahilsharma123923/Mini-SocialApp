import { Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import type { Post } from "@/types/Posts";
import { usePostStore } from "@/store/PostStore";


interface PostProps {
    post : Post
}

const PostCard = ({post}:PostProps) => {
    const toggleLike=usePostStore((state)=>state.toggleLiked);
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 bg-background">

        {/* Header Part */}
     <div className="flex items-center gap-3">
        <Avatar>
            <AvatarFallback>{post.avatar}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
            <span className="text-sm font-semibold">{post.username}</span>
            <span className="text-xs text-muted-foreground">{post.createdAt}</span>
        </div>
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
        <button
          type="button"
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
        </button>

        {/* Comment */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer"
        >
          <MessageCircle className="size-4" />
          <span>{post.comments}</span>
        </button>

      </div>
    </div>
  )
}

export default PostCard
