import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Image, Smile, User } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { usePostStore } from "../store/PostStore"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import axios from "axios"

const CreatePostPage = () => {

  const [text, setText] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addPost = usePostStore((state) => state.addPost)
  const navigate = useNavigate()

  const handlePost = () => {
    if (!text.trim())
      return

    addPost(text, imageUrl ?? undefined)

    setText("")
    setImageUrl(null)

    navigate("/home")
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/upload-image`,
        formData,
        { withCredentials: true }
      )

      setImageUrl(res.data.url)
    } catch (error) {
      console.error("Image upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">

      <Card className="max-w-2xl mx-auto shadow-lg rounded-2xl">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl font-mono font-semibold">Create Post</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex items-start gap-4">

            <Avatar className="h-10 w-10">
              <AvatarFallback>
                <User className="size-5" />
              </AvatarFallback>
            </Avatar>

            <div className="w-full relative">

              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`w-full min-h-32 resize-none border-0 shadow-none focus-visible:ring-0 font-mono text-lg px-4 py-3 ${
                  imageUrl || uploading ? "pt-28" : ""
                }`}
                placeholder="What's on your mind ?"
              />

              {(imageUrl || uploading) && (
                <div className="absolute top-3 left-3 z-10">

                  {uploading && !imageUrl && (
                    <div className="h-20 w-20 rounded-lg border flex items-center justify-center text-xs text-muted-foreground font-mono">
                      ...
                    </div>
                  )}

                  {imageUrl && (
                    <div className="relative h-20 w-20">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg border"
                      />

                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black/80 hover:bg-black text-white"
                        onClick={() => setImageUrl(null)}
                      >
                        ×
                      </Button>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

          <div className="mx-16 flex gap-4 justify-start relative">
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
              <Image className="size-4" />
              Photo
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <Smile className="size-4" />
              Emoji
            </Button>

            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} height={300} />
              </div>
            )}
          </div>

        </CardContent>

        <Separator />

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/home")}
          >
            Cancel
          </Button>

          <Button
            variant="outline"
            disabled={!text.trim()}
            className="font-mono"
            onClick={handlePost}
          >
            Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreatePostPage