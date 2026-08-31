import { create } from "zustand";
import axios from "axios";

import type { Post } from "@/types/Posts";
import type { Comment } from "@/types/comments";

interface PostStore {
  posts: Post[];
  comments: Comment[];

  getPosts: () => Promise<void>;
  addPost: (content:string,image?:string) => Promise<void>;
  toggleLiked: (id: string) => Promise<void>;
  addComment: (comment: Comment) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  editPost: (id: string, content: string) => void;
  editComment: (id: string, content: string) => void;
  deleteComment: (id: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({

  posts: [],
  comments: [],

  getPosts: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          withCredentials: true,
        }
      );
      set({
        posts: res.data.posts,
      });
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  },

  addPost: async(content,image) => {
 
    try{
     const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/create`,
      {content,image},
      {
        withCredentials:true,
      }
     );
      set((state) => ({
      posts: [res.data.post, ...state.posts],
    }));
    }catch(err){
      console.error("Failed to create post:",err);
    }
  },
toggleLiked: async(id) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id
          ? {
              ...post,
              likes: post.isLiked
                ? post.likes.slice(0, -1)
                : [...post.likes, "temp"],
              isLiked: !post.isLiked,
            }
          : post
      ),
    }));

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/${id}/like`,{},
        {
          withCredentials:true
        }
      );
    } catch (error) {
      console.error("Failed to like the post :",error);

      set((state)=>({
        
      posts:state.posts.map((post)=>
      post._id===id ?{
        ...post,
        likes: post.isLiked
          ? post.likes.slice(0, -1)
          : [...post.likes, "temp"],
        isLiked:!post.isLiked ,
      }:post
    ),
      }))
    }
},
  addComment: async(comment) => {
    set((state) => ({
      comments: [...state.comments, comment],

      posts: state.posts.map((post) =>
        post._id === comment.postId
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post
      ),
    }));

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/${comment.postId}/comment`,{content:comment.content},{withCredentials:true});
    } catch (error) {
      console.error("Failed to comment in post:",error);
    }

  },


  deletePost: async(id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`,{withCredentials:true});
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
      }));
    } catch (error) {
      console.log("Failed to delete post:",error)
    }
  },

  editPost: (id, content) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id
          ? {
              ...post,
              content,
            }
          : post
      ),
    }));
  },


  editComment: (id, content) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment._id === id
          ? {
              ...comment,
              content,
            }
          : comment
      ),
    }));
  },


  deleteComment: (id) => {
    set((state) => {
      // Find the comment before deleting it
      const commentToDelete = state.comments.find(
        (comment) => comment._id === id
      );

      // If comment doesn't exist, don't change anything
      if (!commentToDelete) {
        return state;
      }

      return {
        // Remove comment
        comments: state.comments.filter(
          (comment) => comment._id !== id
        ),

        // Decrease comment count of its post
        posts: state.posts.map((post) =>
          post._id === commentToDelete.postId
            ? {
                ...post,
                comments: Math.max(0, post.comments - 1),
              }
            : post
        ),
      };
    });
  },
}));