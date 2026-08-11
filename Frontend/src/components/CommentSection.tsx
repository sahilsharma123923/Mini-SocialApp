import { useState } from "react";
import { usePostStore } from "@/store/PostStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [text, setText] = useState("");

  // Get the comments array from Zustand
  const allComments = usePostStore((state) => state.comments);

  // Get only comments belonging to this post
  const comments = allComments.filter(
    (comment) => comment.postId === postId
  );

  // Get addComment function
  const addComment = usePostStore((state) => state.addComment);

  const handleComment = () => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      postId: postId,
      username: "Sahil",
      content: text,
      createdAt: "Just now",
    };

    addComment(newComment);

    setText("");
  };

  return (
    <div className="mt-3 space-y-4">

      {/* Existing Comments */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg bg-muted/50 p-3"
          >
            <p className="text-sm font-semibold">
              {comment.username}
            </p>

            <p className="text-sm text-muted-foreground">
              {comment.content}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {comment.createdAt}
            </p>
          </div>
        ))}
      </div>

      {/* Write Comment */}
      <div className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleComment();
            }
          }}
          placeholder="Write a comment..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
        />

        <Button
           variant="ghost"
          onClick={handleComment}
        >
          Post
        </Button>
      </div>

    </div>
  );
};

export default CommentSection;