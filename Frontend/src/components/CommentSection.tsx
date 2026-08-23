import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

import { usePostStore } from "@/store/PostStore";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Get comments from Zustand
  const allComments = usePostStore((state) => state.comments);

  // Get comments belonging to this post
  const comments = allComments.filter(
    (comment) => comment.postId === postId
  );

  // Zustand actions
  const addComment = usePostStore((state) => state.addComment);
  const editComment = usePostStore((state) => state.editComment);
  const deleteComment = usePostStore((state) => state.deleteComment);

  const handleComment = () => {
    if (!text.trim()) return;

    const newComment = {
      _id: Date.now().toString(),
      postId,
      username: "Sahil",
      content: text.trim(),
      createdAt: "Just now",
    };

    addComment(newComment);

    setText("");
  };


  const startEditing = (
    commentId: string,
    currentContent: string
  ) => {
    setEditingId(commentId);
    setEditText(currentContent);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (commentId: string) => {
    if (!editText.trim()) return;

    editComment(commentId, editText.trim());

    setEditingId(null);
    setEditText("");
  };


  const handleDelete = (commentId: string) => {
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
          const isEditing = editingId === comment._id;

          return (
            <div
              key={comment._id}
              className="group flex gap-3 border-b border-border/50 py-3 last:border-b-0"
            >
              {/* Content */}
              <div className="flex-1">

                {/* Username */}
                <p className="text-sm font-semibold">
                  {comment.username}
                </p>

                {isEditing ? (
                  /* =========================
                     Edit Comment
                     ========================= */
                  <div className="mt-1 space-y-2">
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEdit(comment._id);
                        }

                        if (e.key === "Escape") {
                          cancelEditing();
                        }
                      }}
                      className="text-sm"
                      autoFocus
                    />

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() =>
                          saveEdit(comment._id)
                        }
                      >
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* =========================
                     Normal Comment
                     ========================= */
                  <>
                    <p className="text-sm text-muted-foreground">
                      {comment.content}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{comment.createdAt}</span>

                      {/* Edit / Delete */}
                      <span className="hidden items-center gap-3 group-hover:flex">

                        {/* Edit */}
                        <button
                          onClick={() =>
                            startEditing(
                              comment._id,
                              comment.content
                            )
                          }
                          className="hover:text-foreground"
                        >
                          <Pencil className="size-3 text-muted-foreground" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(comment._id)
                          }
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash className="size-3 text-muted-foreground" />
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