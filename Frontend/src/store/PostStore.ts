import { create } from "zustand";
import { fakePosts } from "@/data/Posts";
import type { Post } from "@/types/Posts";

interface PostStore{
    posts:Post[];
    addPost:(newpost:Post)=>void;
}

export const usePostStore=create<PostStore>((set)=>({
 
    posts:fakePosts,

    addPost:(newposts)=>{
     set((state)=>({
        posts:[newposts,...state.posts],
     }))
    }

}));