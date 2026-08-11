import { usePostStore } from "@/store/PostStore";
import { useState } from "react";

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [text, setText] = useState("");

  const comments = usePostStore((state) =>
    state.comments.filter((comment) => comment.PostId === postId)
  );

  const addComment=usePostStore((state)=>state.addComment);

  const handleComment=()=>{
     if(!text.trim()) return ;

     addComment({
      id:Date.now(),
      PostId:postId,
      username:"Sahil",
      content:text,
      createdAt:"Just now"
     });

     setText("");
  }

  return (
    <div>
    </div>
  );
};

export default CommentSection;