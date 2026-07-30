import { useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CreatePost = () => {
    const[text,setText]=useState<string>("");
  return (
    <div className="flex items-center border rounded-xl p-4 gap-3">
      <Input value={text} onChange={(e)=>setText(e.target.value)} placeholder="What's on your mind ?" className="flex-1"/>
      <Button variant="outline" onClick={()=>console.log(text)} className="text-shadow-indigo-50 bg-indigo-600 hover:bg-indigo-700">Post</Button>
    </div>
  )
}

export default CreatePost
