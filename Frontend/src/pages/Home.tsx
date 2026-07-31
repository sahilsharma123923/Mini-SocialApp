import Navbar from "@/components/Navbar"
import Feed from "./Feed"
import FloatingButton from "@/components/FloatingButton"
import { usePostStore } from "@/store/PostStore"


const Home = () => {
  const posts=usePostStore((state)=>state.posts);
  return (
    <div>
    <Navbar/>
    <Feed posts={posts}/>
    <FloatingButton/>
    </div>
  )
}

export default Home
