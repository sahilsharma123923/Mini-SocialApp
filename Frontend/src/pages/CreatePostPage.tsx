import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Image, Smile, User } from "lucide-react"
import { Card,CardHeader,CardContent,CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import{ usePostStore }from "../store/PostStore"

const CreatePostPage = () => {
    const[text,setText]=useState("")
    const addPost=usePostStore((state)=>state.addPost);
    const navigate=useNavigate();

    const handlePost=()=>{
      if(!text.trim())
        return;
 
       const newpost={
        id:Date.now(),
        username:"SahilSharma323",
        avatar:"SS",
        content:text,
        likes:0,
        comments:0,
        createdAt:"Just now"
       };

       addPost(newpost);

       setText("");

       navigate("/");
    }


  return (
  <div className="min-h-screen bg-background py-10 px-4">
    <div >
        <Button variant="outline" size="icon" onClick={()=>navigate(-1)} className="w-16 gap-1 font-mono">
            <ArrowLeft className="size-3"/>
            Back
        </Button>
    </div>
     <Card className="max-w-2xl mx-auto shadow-lg rounded-2xl">
      <CardHeader className=" flex items-center justify-center">
        <CardTitle className="text-2xl font-mono font-semibold">Create Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="flex items-start gap-4">

         <Avatar className="h-10 w-10">
            <AvatarFallback>
               <User className="size-5"/>
            </AvatarFallback>
          </Avatar>

          <Textarea 
          value={text}
          onChange={(e)=>setText(e.target.value)}
          className="w-full min-h-40 resize-none border-0 shadow-none focus-visible:ring-0 font-mono text-lg"
          placeholder="What's on your mind ?"
          />
          </div>
          
          <div className=" mx-16 flex gap-4 justify-start">
            <Button variant="outline" size="sm">
               <Image className="size-4 mr-2"/>
               Photo
            </Button>
            <Button variant="outline" size="sm">
                <Smile className="size-4 mr-2"/>
             Emoji
            </Button>
          </div>
       </CardContent>

       <Separator/>

       <CardFooter className="flex justify-between">
        <Button variant="ghost">
          Cancel
        </Button>
        <Button
        variant="outline"
        disabled={!text.trim()}
        className="font-mono"
        onClick={handlePost}
         >Post
        </Button>
       </CardFooter>
     </Card>
 </div>

  )
}

export default CreatePostPage
