import { useState } from "react";
import { usePostStore } from "@/store/PostStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const allComments = usePostStore((state) => state.comments);

  const comments = allComments.filter(
    (comment) => comment.postId === postId
  );

  const addComment = usePostStore((state) => state.addComment);
  const editComment = usePostStore((state) => state.editComment);
  const deleteComment = usePostStore((state) => state.deleteComment);

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

  const startEditing = (commentId: number, currentContent: string) => {
    setEditingId(commentId);
    setEditText(currentContent);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (commentId: number) => {
    if (!editText.trim()) return;

    editComment(commentId, editText);
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = (commentId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;

    deleteComment(commentId);
  };

  return (
    <div className="mt-3 space-y-4">
      {/* Existing Comments */}
      <div>
        {comments.map((comment) => {
          const isEditing = editingId === comment.id;

          return (
            <div
              key={comment.id}
              className="group flex gap-3 border-b border-border/50 py-3 last:border-b-0"
            >

              {/* Content column */}
              <div className="flex-1">
                <p className="text-sm font-semibold">{comment.username}</p>

                {isEditing ? (
                  <div className="mt-1 space-y-2">
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(comment.id);
                        if (e.key === "Escape") cancelEditing();
                      }}
                      className="text-sm"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => saveEdit(comment.id)}
                      >
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={cancelEditing}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      {comment.content}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{comment.createdAt}</span>

                      {/* TODO: only show once real auth exists and comment belongs to logged-in user */}
                      <span className="hidden items-center gap-3 group-hover:flex">
                        <button
                          onClick={() =>
                            startEditing(comment.id, comment.content)
                          }
                          className="hover:underline hover:text-foreground"
                        >
                          <Pencil className="text-muted-foreground size-3"/>
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-400 hover:underline hover:text-red-300"
                        >
                          <Trash className="text-muted-foreground size-3"/>
                        </button>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Write Comment */}
      <div className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleComment();
          }}
          placeholder="Write a comment..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
        />
        <Button variant="ghost" onClick={handleComment}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;