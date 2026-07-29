import { Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"


interface PostProps{
    id:number,
    username:string,
    avatar:string,
    content:string,
    image ?:string,
    likes:number,
    comments:number,
    createdAt:string,
}

const PostCard = ({post}:{post:PostProps}) => {
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
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer hover:text-red-500">
            <Heart className="size-4"/>
            {post.likes}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer">
            <MessageCircle className="size-4"/>
            {post.comments}
        </div>
       </div>
    </div>
  )
}

export default PostCard
