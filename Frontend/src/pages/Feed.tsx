import PostCard from "@/components/PostCard"
import { useState } from "react";


const fakePosts=[
    {
 id:1,
 username:"SahilSharma32",
 avatar:"SS",
 content:"Just deployed my first project!Feeling good about this one.",
 likes:12,
 comments:4,
 createdAt:"2h ago"
},
{
 id:2,
 username:"riya_k",
 avatar:"RK",
 content:"Finally shipped my side project this weekened.Small win, feels huge.",
 likes:24,
 comments:1,
 createdAt:"10min ago"
},
{
 id:3,
 username:"arjun_m",
 avatar:"AM",
 content:"Learning React has been such a fun journey so far.",
 likes:4,
 comments:10,
 createdAt:"1h ago"
},
{
 id:4,
 username:"Bindu_s",
 avatar:"BS",
 content:"Just deployed my first project!Feeling good about this one.",
 likes:2,
 comments:4,
 createdAt:"1h ago"
},{
 id:5,
 username:"Sahil_K",
 avatar:"SK",
 content:"Learning NodeJS and recently make a backend project. ",
 likes:22,
 comments:4,
 createdAt:"1h ago"
}
]


const Feed = () => {
  const[posts,setPosts]=useState(fakePosts);

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 flex flex-col gap-4 font-mono">
     {posts.map((post)=>{
       return <PostCard key={post.id} post={post}/>
      })};
    </div>
  );
}

export default Feed
