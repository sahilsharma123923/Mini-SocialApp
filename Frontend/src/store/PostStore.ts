import { create } from "zustand";
import { fakePosts } from "@/data/Posts";

export const usePostStore=create(()=>({
 
    posts:fakePosts,

}));