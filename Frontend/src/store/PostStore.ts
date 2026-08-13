import { create } from "zustand";
import { fakePosts } from "@/data/Posts";
import type { Post } from "@/types/Posts";
import type { Comment } from "@/types/comments";

interface PostStore {
  posts: Post[];
   comments: Comment[];
  addPost: (newPost: Post) => void;
  toggleLiked: (id: number) => void;
  addComment:(comment:Comment)=>void;
  deletePost:(id:number)=>void;
  editPost:(id:number,content:string)=>void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: fakePosts,
  comments:[],
  addPost: (newPost) => {
    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
  },

  toggleLiked: (id) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.isLiked
                ? post.likes - 1
                : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      ),
    }));
  },

  addComment:(comment)=>{
    set((state)=>({
      comments:[...state.comments,comment],
      posts:state.posts.map((post)=>
      post.id===comment.postId ?{
        ...post,
        comments:post.comments+1
      }
    :post
    )
    }));
  },
 
  deletePost:(id)=>{
    set((state)=>({
      posts:state.posts.filter((post)=>post.id !==id)
    }))
  },
  editPost(id, content) {
    set((state)=>({
      posts:state.posts.map((post)=>
        post.id===id ? {
          ...post,
          content:content,
        }
        :post
      )
    }))
  },
}));