import { create } from "zustand";
import axios from "axios";

import type { Post } from "@/types/Posts";
import type { Comment } from "@/types/comments";

interface PostStore {
  posts: Post[];
  comments: Comment[];

  getPosts: () => Promise<void>;
  addPost: (newPost: Post) => void;
  toggleLiked: (id: string) => void;
  addComment: (comment: Comment) => void;
  deletePost: (id: string) => void;
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

  addPost: (newPost) => {
    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
  },

  toggleLiked: (id) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id
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

  addComment: (comment) => {
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
  },


  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== id),
    }));
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