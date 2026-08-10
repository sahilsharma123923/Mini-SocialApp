import { create } from "zustand";
import { fakePosts } from "@/data/Posts";
import type { Post } from "@/types/Posts";

interface PostStore {
  posts: Post[];
  addPost: (newPost: Post) => void;
  toggleLiked: (id: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: fakePosts,

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
}));