export interface Post {
  _id: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  createdAt: string;
}