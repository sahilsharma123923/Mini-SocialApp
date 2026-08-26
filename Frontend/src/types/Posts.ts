export interface Post {
  _id: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  content: string;
  image?: string;
  likes: string[];
  isLiked: boolean;
  comments: number;
  createdAt: string;
}