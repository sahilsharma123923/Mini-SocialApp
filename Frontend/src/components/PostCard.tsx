import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import type { Post } from "@/types/Posts";
import { usePostStore } from "@/store/PostStore";
import CommentSection from "./CommentSection";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  // Zustand actions
  const toggleLike = usePostStore((state) => state.toggleLiked);
  const deletePost = usePostStore((state) => state.deletePost);
  const editPost = usePostStore((state) => state.editPost);

  // Local UI states
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.content);

  // Save edited post
  const handleSave = () => {
    if (!editText.trim()) return;

    editPost(post._id, editText);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditText(post.content);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-background p-4">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">

        {/* User information */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {post.avatar}
            </AvatarFallback>
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

          {/* Options menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
            render={
           <div
             title="Post options"
             className={cn(
             buttonVariants({ variant: "ghost", size: "icon" }),"text-muted-foreground cursor-pointer")}>
             <MoreVertical className="size-4" />
           </div>
          }/>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>setIsEditing(true)}>
                <Pencil className="size-3"/>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>deletePost(post._id)}
                className="text-red-500 focus:text-red-500"
                >
                <Trash className="size-3"/>
                Delete
                </DropdownMenuItem>  
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      {/* ================= BODY ================= */}
      <div>
        {isEditing ? (
          <div className="flex flex-col gap-3">

            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit your post..."
              className="min-h-24"
            />

            <div className="flex gap-2">
              <Button
              variant="ghost"
              onClick={handleSave}>
                Save
              </Button>

              <Button
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p>{post.content}</p>
        )}

        {/* Post Image */}
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="mt-2 w-full rounded-lg object-cover"
          />
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between border-t pt-3">

        {/* Like & Comment */}
        <div className="flex items-center gap-5">

          {/* LIKE */}
          <Button
            variant="ghost"
            onClick={() => toggleLike(post._id)}
            className={`flex items-center gap-1.5 text-sm ${
              post.isLiked
                ? "text-red-500"
                : "text-muted-foreground hover:text-red-500"
            }`}
          >
            <Heart
              className="size-4"
              fill={
                post.isLiked
                  ? "currentColor"
                  : "none"
              }
            />

            <span>{post.likes}</span>
          </Button>

          {/* COMMENT */}
          <Button
            variant="ghost"
            onClick={() =>
              setShowComments((prev) => !prev)
            }
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <MessageCircle className="size-4" />

            <span>{post.comments}</span>
          </Button>
        </div>
      </div>

      {/* ================= COMMENTS ================= */}
      {showComments && (
        <div className="border-t pt-3">

          <CommentSection postId={post._id} />

          <Button
            variant="ghost"
            onClick={() => setShowComments(false)}
            className="mt-2"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostCard;