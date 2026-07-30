import { useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";


const CreatePost = () => {
    const[text,setText]=useState<string>("");
  return (
    <div className="flex items-center border rounded-xl p-6 gap-3">
    
      <Avatar className="size-10">
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>
       <Input value={text} onChange={(e)=>setText(e.target.value)} placeholder="What's on your mind ?" className="flex-1"/>

      <Button onClick={()=>console.log(text)} className=" text-neutral-200 hover:text-neutral-50  bg-indigo-600 hover:bg-indigo-700 p-3">Post</Button>
    </div>
  )
}

export default CreatePost
