import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Image, Smile, User } from "lucide-react"
import { Card,CardHeader,CardContent,CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import{ usePostStore }from "../store/PostStore"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import axios from "axios"

const CreatePostPage = () => {
  
    const[text,setText]=useState("")
    const [showEmojiPicker,setShowEmojiPicker]=useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const addPost=usePostStore((state)=>state.addPost);
    const navigate=useNavigate();

    const handlePost=()=>{
      if(!text.trim())
        return;
 
       addPost(text, imageUrl ?? undefined);

       setText("");
       setImageUrl(null);

       navigate("/home");
    }

    const handleEmojiClick = (emojiData: EmojiClickData) => {
     setText((prev) => prev + emojiData.emoji);
     setShowEmojiPicker(false);
}

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/posts/upload-image`,
          formData,
          { withCredentials: true }
        );

        setImageUrl(res.data.url);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setUploading(false);
      }
    }

  return (
  <div className="min-h-screen bg-background py-10 px-4">
  
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

          {uploading && (
            <p className="text-sm text-muted-foreground font-mono ml-16">Uploading image...</p>
          )}

          {imageUrl && (
            <div className="ml-16 relative w-fit">
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-64 rounded-lg border"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => setImageUrl(null)}
              >
                ×
              </Button>
            </div>
          )}
          
          <div className=" mx-16 flex gap-4 justify-start relative">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
               <Image className="size-4"/>
               Photo
            </Button>
            <Button
             type="button"
             variant="outline"
              size="sm"
              onClick={()=>setShowEmojiPicker((prev)=>!prev)}
              >
                <Smile className="size-4"/>
             Emoji
            </Button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick}/>
              </div>
            )}
          </div>
       </CardContent>

       <Separator/>

       <CardFooter className="flex justify-between">
        <Button 
        variant="outline"
        onClick={()=>navigate("/home")}
        >
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